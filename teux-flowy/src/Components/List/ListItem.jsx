import { useState, useCallback, useEffect } from "react";
import { NameInput } from "../Input/NameInput";
import * as S from "./StylesListItem";
import { AppContext } from "../../ContextApi";
import { ToggleVisibilty } from "../ToggleVisibility/ToggleVisibility";
import { CSSTransition } from "react-transition-group"
import InlineContext from "../InlineContext/InlineContext";
import uniqid from "uniqid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEllipsisH } from '@fortawesome/fontawesome-free-solid'




const ListItem = ({
    id,
    parentList,
    parentNameList,
    isFirst,
    isFirstInList,
    isLastInList,
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
    const [inPort, setInPort] = useState(false);
    const [isInlineContextVisibile, setIsInlineContextVisibile] = useState(false);
    const [isMarkedAsDone, setIsMarkedAsDone] = useState(false);
    const [inlineContextClickCoordinates, setInlineContextClickCoordinates] = useState({x: 0, y: 0})

    // Extend forwarded parentList
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
                setChildrenVisible(data.expanded);
                setIsMarkedAsDone(data.done);
            })
            .then(() => {
                setOutOfSync(false);
                setInPort(true);
            });
    }, [id]);

    const changeSyncStatus = useCallback(() => {
        setOutOfSync(true);
    }, [outOfSync]);

    useEffect(() => {
        if (outOfSync) {
            fetchCurrentNestedNoteBasedOnParentsSublistId()
        }
    }, [changeSyncStatus]);

    let filteredParentSublist = parentSublist && parentSublist.filter((value) => {
        if (value !== listItemObject.id) {
            return value;
        }
    });

    let urlParent = parentList[parentList.length - 2];

    const removeCurrentInput = () => {

        const cascadingChildrenRemoval = (id) => {
            return fetch(`http://localhost:3000/notes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("==========new loop", data.subList);
                data.subList.forEach(listItemId => {
                    console.log(listItemId);
                    const promiseCascadingDelete = new Promise((res, rej) => {
                        cascadingChildrenRemoval(listItemId);
                        res(null);
                    })
                    promiseCascadingDelete
                    .then(() => {
                        fetch(`http://localhost:3000/notes/${listItemId}`, {
                            method: "DELETE",
                            });
                    })
                    
                    })            
            })
            .then(() => {
                console.log("Past loop", id)
            })
        }
        
        if (parentChangeSyncStatus !== null) {
            
           cascadingChildrenRemoval(id);

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

    const addChildInputField = useCallback(() => {

        const newID = uniqid();

        return fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: newID,
                name:"Pisz tutaj ...",
                done: false,
                expanded: false,
                subList: [],
            })
        })
        .then(() => {
            fetch(`http://localhost:3000/notes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    expanded: true,
                    subList: [
                        newID,
                        ...listItemObject.subList,
                    ]
                })
            });
        })
        .then(() => {
            changeSyncStatus()
        })
    },[listItemObject])

    const moveUpCurrentInput = () => {
        const swappedIndex = parentSublist.indexOf(id);
        if (!isFirstInList) {
            const swapped = parentSublist[swappedIndex-1];
            parentSublist[swappedIndex-1] = parentSublist[swappedIndex];
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
    }

    const moveDownCurrentInput = () => {
        const swappedIndex = parentSublist.indexOf(id);
        if (!isLastInList) {
            const swapped = parentSublist[swappedIndex+1];
            parentSublist[swappedIndex+1] = parentSublist[swappedIndex];
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
    }

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
            })
    }

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
            })
    }


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
                            {!isInlineContextVisibile && 
                            <S.InlineContextButton
                                 onClickCapture = {(e) => {
                                        setIsInlineContextVisibile(!isInlineContextVisibile);
                                        setInlineContextClickCoordinates({
                                            x: e.nativeEvent.pageX,
                                            y: e.nativeEvent.pageY
                                        })
                                    }}
                            >
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </S.InlineContextButton>}

                            
                            {isInlineContextVisibile && 
                            <S.InlineContextButton>
                                <FontAwesomeIcon icon={faTimes} />
                            </S.InlineContextButton>}


                            {isInlineContextVisibile && <InlineContext
                                inlineContextClickCoordinates={inlineContextClickCoordinates}
                                isFirst={isFirst}
                                isFirstInList={isFirstInList}
                                isLastInList={isLastInList}
                                setIsInlineContextVisibile={setIsInlineContextVisibile}
                                removeCurrentInput = {removeCurrentInput}
                                addChildInputField={addChildInputField}
                                moveUpCurrentInput={moveUpCurrentInput}
                                moveDownCurrentInput={moveDownCurrentInput}
                                isMarkedAsDone={isMarkedAsDone}
                                toggleIsMarkedAsDone={toggleIsMarkedAsDone}
                            />}

                            {/* sublist hidden/shown button */}
                            {!isFirst && <ToggleVisibilty
                                childrenVisible={childrenVisible}
                                toggleChildrenVisible={toggleChildrenVisible}
                                subList={listItemObject.subList}
                            ></ToggleVisibilty>}

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
                                addChildInputField={addChildInputField}
                                removeCurrentInput={removeCurrentInput}
                                listItemObject={listItemObject}
                                changeSyncStatus={changeSyncStatus}
                                isMarkedAsDone={isMarkedAsDone}
                            />

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
                                            isFirstInList={index == 0}
                                            isLastInList={index == (listItemObject.subList.length -1)}
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
