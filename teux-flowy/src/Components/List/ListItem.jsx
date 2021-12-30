import { useState, useCallback, useEffect } from "react";
import { NameInput } from "../Input/NameInput";
import * as S from "./StylesListItem";
import { AppContext } from "../../ContextApi";
import { ToggleVisibilty } from "../ToggleVisibility/ToggleVisibility";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "styled-components";

const ListItem = ({
    id,
    parentList,
    parentNameList,
    isFirst,
    parentSublist,
    parentChangeSyncStatus,
    cssAnimationState,
    setCssAnimationState,
    parentLocalAnimationState,
    setParentLocalAnimationState,
}) => {
    // States
    const [outOfSync, setOutOfSync] = useState(true);
    const [listItemObject, setListItemObject] = useState({
        id: "",
        name: "",
        subList: [],
    });
    const [childrenVisible, setChildrenVisible] = useState(true);
    const [localAnimationState, setLocalAnimationState] = useState(true);
    const [childrenAnimationAdd, setChildrenAnimationAdd] = useState(false);

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
                setChildrenAnimationAdd(true);
                setCssAnimationState(true);
                setOutOfSync(false);
            });
    }, [id]);

    const changeSyncStatus = () => {
        setOutOfSync(true);
    };

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

    const removeCurrentInput = () => {
        if (parentChangeSyncStatus !== null) {
            let urlParent = parentList[parentList.length - 2];

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
                .then(() => {
                    setLocalAnimationState(false);

                    setTimeout(() => {
                        parentChangeSyncStatus();
                    }, 100);
                });
        }
    };

    return (
        <AppContext.Consumer>
            {(context) =>
                listItemObject.id !== "" && (
                    <CSSTransition
                        in={childrenAnimationAdd}
                        timeout={300}
                        classNames={"page"}
                        unmountOnExit
                    >
                        <CSSTransition
                            in={localAnimationState}
                            timeout={300}
                            classNames={"pageMain"}
                            unmountOnExit
                        >
                            <S.ListElement key={listItemObject.id}>
                                <S.ListElementHeader isFirst={isFirst}>
                                    {/* popup menu */}
                                    <S.PopUpMenuButton>&#8943;</S.PopUpMenuButton>

                                    {/* sublist hidden/shown button */}
                                    <ToggleVisibilty
                                        isFirst={isFirst}
                                        setLocalAnimationState={setLocalAnimationState}
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
                                                setCssAnimationState(false);
                                                setLocalAnimationState(false);

                                                setTimeout(() => {
                                                    context.setCurrentNotes({
                                                        names: parentNameList,
                                                        currentPath: listUrl,
                                                    });
                                                }, 300);
                                            }}
                                        ></S.DotButton>
                                    )}

                                    {/* Item title = input with onchange attribute  */}
                                    <NameInput
                                        setChildrenAnimationAdd={setChildrenAnimationAdd}
                                        isFirst={isFirst}
                                        setParentLocalAnimationState={setParentLocalAnimationState}
                                        removeCurrentInput={removeCurrentInput}
                                        listItemObject={listItemObject}
                                        changeSyncStatus={changeSyncStatus}
                                        setLocalAnimationState={setLocalAnimationState}
                                    />
                                    {/* <FontAwesomeIcon icon="fa-regular fa-circle-trash" /> */}

                                    {/* drag list item handle */}
                                </S.ListElementHeader>
                                {/* sublist */}
                                {childrenVisible && (
                                    <S.ListContainer>
                                        {/* loop generating listItems */}
                                        {listItemObject.subList.map((id, index) => (
                                            <>
                                                <ListItem
                                                    parentLocalAnimationState={localAnimationState}
                                                    setParentLocalAnimationState={
                                                        setLocalAnimationState
                                                    }
                                                    setCssAnimationState={setCssAnimationState}
                                                    cssAnimationState={cssAnimationState}
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
                    </CSSTransition>
                )
            }
        </AppContext.Consumer>
    );
};

export { ListItem };
