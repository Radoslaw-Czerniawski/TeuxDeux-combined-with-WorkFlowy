import { useState, useCallback, useEffect } from "react";
import { NameInput } from "../Input/NameInput";
import * as S from "./StylesListItem";
import { AppContext } from "../../ContextApi";

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

    const listUrl = [...parentList, id];

    if (parentNameList[parentNameList.length - 1] !== listItemObject.name) {
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
            });
    }, [id]);

    const changeSyncStatus = useCallback(() => {
        setOutOfSync(true);
        console.log("Changed sync status");
    }, [outOfSync]);

    useEffect(() => {
        if (outOfSync) {
            fetchCurrentNestedNoteBasedOnParentsSublistId();
        }
    }, [changeSyncStatus]);

    let filteredParentSublist =
        parentSublist &&
        parentSublist.filter((value) => {
            if (value !== listItemObject.id) {
                return value;
            }
        });

    const removeCurrentInput = useCallback((e) => {
        if (parentChangeSyncStatus !== undefined) {
            fetch(`http://localhost:3000/notes/${parentList[parentList.length - 2]}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    subList: [...filteredParentSublist],
                }),
            })
            .then(() => {
                fetch(`http://localhost:3000/notes/${listItemObject.id}`, {
                    method: "DELETE",
                });
            })
            .then(() => parentChangeSyncStatus());
        }
    }, [listItemObject]);

    return (
        <AppContext.Consumer>
            {(context) =>
                listItemObject.id !== "" && (
                    <S.ListElement key={listItemObject.id}>
                        <S.ListElementHeader isFirst={isFirst}>
                            {/* popup menu */}

                            {/* sublist hidden/shown button */}

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
                                parentSublist={parentSublist}
                                listItemObject={listItemObject}
                                // parentList={parentList}
                                changeSyncStatus={changeSyncStatus}
                            />
                            {/* <FontAwesomeIcon icon="fa-regular fa-circle-trash" /> */}

                            {/* drag list item handle */}
                        </S.ListElementHeader>
                        {/* sublist */}
                        <S.ListContainer>
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
                    </S.ListElement>
                )
            }
        </AppContext.Consumer>
    );
};

export { ListItem };
