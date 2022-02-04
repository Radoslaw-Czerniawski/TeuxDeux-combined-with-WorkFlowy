// COMPONENTS
import { ToggleVisibilty } from "../ToggleVisibility/ToggleVisibility";
import ListElementDateComponent from "../ListElementDate/ListElementDate";
import InlineContext from "../InlineContext/InlineContext";
import { NameInput } from "../Input/NameInput";
import * as S from "./StylesListItem";
import DialogComponent from "../Dialog/DialogComponent";

// React
import { useState, useCallback, useEffect } from "react";

// Context
import { AppContext } from "../../ContextApi";

//Animations
import { CSSTransition, TransitionGroup } from "react-transition-group";

// uniqid for random ids
import uniqid from "uniqid";

// Font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEllipsisH } from "@fortawesome/fontawesome-free-solid";

const ListItem = ({
    id,
    parentList,
    parentNameList,
    isFirst,
    isFirstInList,
    isLastInList,
    parentSublist,
    parentChangeSyncStatus,
    cssAnimationState,
    setCssAnimationState,
    parentLocalAnimationState,
    setParentLocalAnimationState,
}) => {
    // STATES
    const [needComponentReload, setNeedComponentReload] = useState(true);
    const [listItemObject, setListItemObject] = useState({
        id: "",
        name: "",
        subList: [],
    });
    const [listItemObjectDate, setListItemObjectDate] = useState({
        hasDate: false,
        date: "",
    });
    const [childrenVisible, setChildrenVisible] = useState(true);
    const [isInlineContextVisibile, setIsInlineContextVisibile] = useState(false);
    const [isMarkedAsDone, setIsMarkedAsDone] = useState(false);
    const [inlineContextClickCoordinates, setInlineContextClickCoordinates] = useState({
        x: 0,
        y: 0,
    });
    const [localAnimationState, setLocalAnimationState] = useState(false);
    const [isDialogOn, setIsDialogOn] = useState(false);

    // Extend forwarded parentList
    const listUrl = [...parentList, id];

    //Extend parent name list
    if (parentList[parentList.length - 1] !== listItemObject.id) {
        parentNameList = [...parentNameList, listItemObject.name];
        parentList = [...parentList, id];
    }

    // Fetch list item data on mount
    const fetchCurrentNestedNoteBasedOnParentsSublistId = useCallback(() => {
        return fetch(`http://localhost:3000/notes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setListItemObject({
                    id: `${data.id}`,
                    name: `${data.name}`,
                    subList: [...data.subList],
                });
                setListItemObjectDate({
                    hasDate: data.hasDate,
                    date: `${data.date}`,
                });
                setChildrenVisible(data.expanded);
                setIsMarkedAsDone(data.done);
            })
            .then(() => {
                setCssAnimationState(true);
                setLocalAnimationState(true)
                setNeedComponentReload(false);
            });
    }, [id]);

    // Notify about out of sync state
    const changeSyncStateToReloadComponentAfterNoteEdit = useCallback(() => {
        setNeedComponentReload(true);
    }, [needComponentReload]);

    useEffect(() => {
        if (needComponentReload) {
            fetchCurrentNestedNoteBasedOnParentsSublistId();
        }
    }, [changeSyncStateToReloadComponentAfterNoteEdit]);

    let filteredParentSublist =
        parentSublist &&
        parentSublist.filter((value) => {
            if (value !== listItemObject.id) {
                return value;
            }
        });

    let urlParent = parentList[parentList.length - 2];

    const removeOrEditGivenDateFromDatabse = (date) => {
        const dateAdress = JSON.stringify(date).replace(/"/g, "");
        fetch(`http://localhost:3000/dates/${dateAdress}`)
            .then((res) => res.json())
            .then((insideData) => {
                if (insideData.notes.length === 1) {
                    fetch(`http://localhost:3000/dates/${dateAdress}`, {
                        method: "DELETE",
                    });
                } else {
                    fetch(`http://localhost:3000/dates/${dateAdress}`, {
                        method: "PATCH",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            notes: insideData.notes.filter((value) => value !== id && value),
                        }),
                    });
                }
            });
    };

    const removeCurrentInput = () => {
        const cascadingChildrenRemoval = (id) => {
            return fetch(`http://localhost:3000/notes/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    removeOrEditGivenDateFromDatabse(data.date);

                    data.subList.forEach((listItemId) => {
                        Promise.resolve(cascadingChildrenRemoval(listItemId)).then(() => {
                            fetch(`http://localhost:3000/notes/${listItemId}`, {
                                method: "DELETE",
                            });
                        });
                    });
                });
        };

        if (parentChangeSyncStatus !== null) {
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
                    cascadingChildrenRemoval(id);
                })
                .then(() => {
                    fetch(`http://localhost:3000/notes/${id}`, {
                        method: "DELETE",
                    });
                })
                .then(() => {
                    setLocalAnimationState(false);

                    setTimeout(() => {
                        parentChangeSyncStatus();
                    }, 300);
                });
        }
    };

    const addChildInputField = useCallback(() => {
        const newID = uniqid();

        return fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: newID,
                name: "Write here...",
                done: false,
                expanded: false,
                subList: [],
                hasDate: false,
                date: "",
            }),
        })
            .then(() => {
                fetch(`http://localhost:3000/notes/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        expanded: true,
                        subList: [newID, ...listItemObject.subList],
                    }),
                });
            })
            .then(() => {
                changeSyncStateToReloadComponentAfterNoteEdit();
            });
    }, [listItemObject]);

    const moveUpCurrentInput = () => {
        const swappedIndex = parentSublist.indexOf(id);
        if (!isFirstInList) {
            const swapped = parentSublist[swappedIndex - 1];
            parentSublist[swappedIndex - 1] = parentSublist[swappedIndex];
            parentSublist[swappedIndex] = swapped;
            fetch(`http://localhost:3000/notes/${urlParent}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    subList: parentSublist,
                }),
            }).then(() => parentChangeSyncStatus());
        }
    };

    const moveDownCurrentInput = () => {
        const swappedIndex = parentSublist.indexOf(id);
        if (!isLastInList) {
            const swapped = parentSublist[swappedIndex + 1];
            parentSublist[swappedIndex + 1] = parentSublist[swappedIndex];
            parentSublist[swappedIndex] = swapped;
            fetch(`http://localhost:3000/notes/${urlParent}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    subList: parentSublist,
                }),
            }).then(() => parentChangeSyncStatus());
        }
    };

    const toggleIsMarkedAsDone = () => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                done: !isMarkedAsDone,
            }),
        }).then(() => {
            setIsMarkedAsDone(!isMarkedAsDone);
        });
    };

    const toggleChildrenVisible = () => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                expanded: !childrenVisible,
            }),
        }).then(() => {
            setChildrenVisible(!childrenVisible);
        });
    };

    const removeDate = () => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                hasDate: false,
                date: "",
            }),
        })
            .then(() => {
                removeOrEditGivenDateFromDatabse(listItemObjectDate.date);
            })
            .then(() => {
                changeSyncStateToReloadComponentAfterNoteEdit();
            });
    };

    return (
        <AppContext.Consumer>
            {(context) =>
                listItemObject.id !== "" && (
                    <CSSTransition
                        in={localAnimationState}
                        timeout={300}
                        classNames={"pageMain"}
                        unmountOnExit
                    >
                        <S.ListElement key={listItemObject.id} isFirst={isFirst}>
                            {isDialogOn && (
                                <DialogComponent
                                    setIsDialogOn={setIsDialogOn}
                                    setNeedComponentReload={setNeedComponentReload}
                                    id={id}
                                ></DialogComponent>
                            )}
                            <S.ListElementHeader isFirst={isFirst}>
                                <S.ListElementButtonContainer>
                                    {/* popup menu */}
                                    {!isInlineContextVisibile && (
                                        <S.InlineContextButton
                                            isFirst={isFirst}
                                            isInlineContextVisibile={isInlineContextVisibile}
                                            onClickCapture={(e) => {
                                                setIsInlineContextVisibile(
                                                    !isInlineContextVisibile
                                                );
                                                setInlineContextClickCoordinates({
                                                    x: e.nativeEvent.clientX,
                                                    y: e.nativeEvent.clientY,
                                                });
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEllipsisH} />
                                        </S.InlineContextButton>
                                    )}

                                    {isInlineContextVisibile && (
                                        <S.InlineContextButton
                                            isFirst={isFirst}
                                            isInlineContextVisibile={isInlineContextVisibile}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </S.InlineContextButton>
                                    )}

                                    {isInlineContextVisibile && (
                                        <InlineContext
                                            id={id}
                                            inlineContextClickCoordinates={
                                                inlineContextClickCoordinates
                                            }
                                            isFirst={isFirst}
                                            isFirstInList={isFirstInList}
                                            isLastInList={isLastInList}
                                            setIsInlineContextVisibile={setIsInlineContextVisibile}
                                            removeCurrentInput={removeCurrentInput}
                                            addChildInputField={addChildInputField}
                                            moveUpCurrentInput={moveUpCurrentInput}
                                            moveDownCurrentInput={moveDownCurrentInput}
                                            isMarkedAsDone={isMarkedAsDone}
                                            toggleIsMarkedAsDone={toggleIsMarkedAsDone}
                                            setIsDialogOn={setIsDialogOn}
                                            removeDate={removeDate}
                                            listItemObjectDate={listItemObjectDate}
                                        />
                                    )}

                                    {/* sublist hidden/shown button */}
                                    {!isFirst && (
                                        <ToggleVisibilty
                                            childrenVisible={childrenVisible}
                                            toggleChildrenVisible={toggleChildrenVisible}
                                            subList={listItemObject.subList}
                                        ></ToggleVisibilty>
                                    )}

                                    {/* dot button */}
                                    {!isFirst && (
                                        <S.DotButton
                                            /* to={`/${nodeUrl}`} */
                                            key={"dButton" + listItemObject.id}
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
                                </S.ListElementButtonContainer>
                                <S.ListElementDateAndTitleContainer>
                                    <NameInput
                                        isFirst={isFirst}
                                        addChildInputField={addChildInputField}
                                        removeCurrentInput={removeCurrentInput}
                                        listItemObject={listItemObject}
                                        isMarkedAsDone={isMarkedAsDone}
                                    />
                                    <ListElementDateComponent
                                        key={`date-el-${id}`}
                                        setIsDialogOn={setIsDialogOn}
                                        id={id}
                                        isFirst={isFirst}
                                        listItemObjectDate={listItemObjectDate}
                                    />
                                </S.ListElementDateAndTitleContainer>
                                {/* drag list item handle */}
                            </S.ListElementHeader>
                            {/* sublist */}
                            {(childrenVisible || isFirst) && (
                                <S.ListContainer>
                                    <TransitionGroup>
                                        {/* loop generating listItems */}

                                        {listItemObject.subList.map((id, index) => (
                                            <CSSTransition
                                                in={localAnimationState}
                                                timeout={300}
                                                classNames={"pageMain"}
                                                unmountOnExit
                                                key={id}
                                            >
                                                <>
                                                    <ListItem
                                                        parentLocalAnimationState={
                                                            localAnimationState
                                                        }
                                                        setParentLocalAnimationState={
                                                            setLocalAnimationState
                                                        }
                                                        setCssAnimationState={setCssAnimationState}
                                                        cssAnimationState={cssAnimationState}
                                                        isFirst={false}
                                                        isFirstInList={index === 0}
                                                        isLastInList={
                                                            index ===
                                                            listItemObject.subList.length - 1
                                                        }
                                                        id={id}
                                                        key={id}
                                                        parentSublist={listItemObject.subList}
                                                        parentList={parentList}
                                                        parentNameList={parentNameList}
                                                        parentChangeSyncStatus={
                                                            changeSyncStateToReloadComponentAfterNoteEdit
                                                        }
                                                    />
                                                    {!isFirst && <S.CoveringLine />}
                                                </>
                                            </CSSTransition>
                                        ))}
                                    </TransitionGroup>
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
