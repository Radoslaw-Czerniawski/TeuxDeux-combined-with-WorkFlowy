import { useState, useCallback, useEffect } from "react";
import { NameInput } from "../Input/NameInput";
import * as S from "./StylesListItem";
import { AppContext } from "../../ContextApi";
import { ToggleVisibilty } from "../ToggleVisibility/ToggleVisibility";
import { CSSTransition } from "react-transition-group"

const ListItem = ({
    id,
    parentList,
    parentNameList,
    isFirst,
    parentSublist,
    parentChangeSyncStatus,
}) => {
    const [outOfSync, setOutOfSync] = useState(true);
    const [listItemObject, setListItemObject] = useState({
        id: "",
        name: "",
        subList: [],
    });
    const [childrenVisible, setChildrenVisible] = useState(false);
    const [inPort, setInPort] = useState(false)


    const listUrl = [...parentList, id];

    if (parentList[parentList.length - 1] !== listItemObject.id) {
        parentNameList = [...parentNameList, listItemObject.name];
        parentList = [...parentList, id];
    }

    const fetchCurrentNestedNoteBasedOnParentsSublistId = useCallback(() => {
        return fetch(`http://localhost:3000/notes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setListItemObject({
                    id: `${data.id}`,
                    name: `${data.name}`,
                    subList: [...data.subList],
                });
            })
            .then(() => {
                setOutOfSync(false);
                setInPort(true);
            });
    }, [id]);

    const changeSyncStatus = useCallback(() => {
        setOutOfSync(true);
        console.log("Changed sync status");
    }, [outOfSync]);

    useEffect(() => {
        if (outOfSync) {
            fetchCurrentNestedNoteBasedOnParentsSublistId()
        }
    }, [changeSyncStatus]);

    //Visibility state for children

    let filteredParentSublist = parentSublist && parentSublist.filter((value) => {
        if (value !== listItemObject.id) {
            return value;
        }
    });

    const removeCurrentInput = () => {
        if (parentChangeSyncStatus !== null) {
            let urlParent = parentList[parentList.length - 2];

            console.log(urlParent);

            fetch(`http://localhost:3000/notes/${urlParent}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    subList: filteredParentSublist === [] ? [] : filteredParentSublist,
                }),
            })
                .then(() => {
                    fetch(`http://localhost:3000/notes/${listItemObject.id}`, {
                        method: "DELETE",
                    });
                })
                .then(() => parentChangeSyncStatus());
        }
    };

    return (
        <AppContext.Consumer>
            {(context) =>
                listItemObject.id !== "" && (
                    <CSSTransition
                        in={inPort}
                        timeout={300}
                        classNames="page"
                        unmountOnExit
                    >
                    <S.ListElement
                        key={listItemObject.id}
                    >
                        <S.ListElementHeader
                            isFirst={isFirst}
                        >
                            {/* popup menu */}

                            {/* sublist hidden/shown button */}
                            <ToggleVisibilty
                                childrenVisible={childrenVisible}
                                setChildrenVisible={setChildrenVisible}
                                subList={listItemObject.subList}
                            ></ToggleVisibilty>

                            {/* dot button */}
                            {!isFirst && (
                                <S.DotButton
                                    /* to={`/${nodeUrl}`} */
                                    key={listItemObject.id}
                                    onClick={() => {
                                        context.setCurrentNotes({
                                            names: parentNameList,
                                            currentPath: listUrl,
                                        });
                                    }}
                                ></S.DotButton>
                            )}

                            {/* Item title = input with onchange attribute  */}
                            <NameInput
                                isFirst={isFirst}
                                removeCurrentInput={removeCurrentInput}
                                listItemObject={listItemObject}
                                changeSyncStatus={changeSyncStatus}
                                setChildrenVisible={setChildrenVisible}
                            />
                            {/* <FontAwesomeIcon icon="fa-regular fa-circle-trash" /> */}

                            {/* drag list item handle */}
                        </S.ListElementHeader>
                        {/* sublist */}
                        {childrenVisible && (
                            <S.ListContainer >
                                {/* loop generating listItems */}
                                {listItemObject.subList.map((id, index) => (
                                    <>
                                        <ListItem
                                            isFirst={false}
                                            id={id}
                                            key={id}
                                            parentSublist={listItemObject.subList}
                                            parentList={parentList}
                                            parentNameList={parentNameList}
                                            parentChangeSyncStatus={changeSyncStatus}
                                        />
                                        {!isFirst && <S.CoveringLine />}
                                    </>
                                ))}

                                {/* + button for adding listItem */}
                            </S.ListContainer>
                        )}
                    </S.ListElement>
                </CSSTransition>

                )
            }
        </AppContext.Consumer>
    );
};

export { ListItem };
