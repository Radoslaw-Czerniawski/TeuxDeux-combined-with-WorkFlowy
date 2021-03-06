// COMPONENTS
import { ToggleVisibilty } from "../ToggleVisibility/ToggleVisibility";
import { ListElementDate } from "../ListElementDate/ListElementDate";
import InlineContext from "../InlineContext/InlineContext";
import { NameInput } from "../Input/NameInput";
import * as S from "./StylesListItem";
import DialogComponent from "../Dialog/DialogComponent";

// Firebase
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    update,
    remove,
    get,
    child,
    off,
} from "firebase/database";
import { db as fireData } from "../../DB/DB";

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
import { async } from "@firebase/util";

export const updateFirebaseProperty = (noteId, property, value) => {
    return update(ref(fireData, `notes/${noteId}/`), { [property]: value });
};

export const ListItem = ({
    userInfo,
    id,
    parentList,
    parentNameList,
    isFirst,
    isFirstInList,
    isLastInList,
    parentSublist,
    cssAnimationState,
    setCssAnimationState,
    parentLocalAnimationState,
    setParentLocalAnimationState,
}) => {
    // STATES
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

    if (parentList[parentList.length - 1] !== listItemObject.id) {
        parentNameList = [...parentNameList, listItemObject.name];
        parentList = [...parentList, id];
    }

    let filteredParentSublist =
        parentSublist &&
        parentSublist.filter((value) => {
            if (value !== listItemObject.id) {
                return value;
            }
        });

    let urlParent = parentList[parentList.length - 2];

    //Extend parent name list

    /////////////////////////////////////////////////////////////////////////////
    // FIREBASE FUNCTIONS
    /////////////////////

    useEffect(() => {
        onValue(ref(fireData, `notes/${id}`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log("wow");
                setListItemObject({
                    id: `${id}`,
                    name: `${data.name}`,
                    subList: data.subList ? data.subList : [],
                });
                data.hasDate &&
                    setListItemObjectDate({
                        hasDate: data.hasDate,
                        date: `${data.date}`,
                    });
                !data.hasDate &&
                    setListItemObjectDate({
                        hasDate: data.hasDate,
                        date: null,
                    });

                setChildrenVisible(data.expanded);
                setIsMarkedAsDone(data.done);

                if (isFirst) {
                    setCssAnimationState(true);
                    setLocalAnimationState(true);
                } else {
                    setTimeout(() => {
                        setCssAnimationState(true);
                        setLocalAnimationState(true);
                    }, 0);
                }
            }
        });
    }, []);

    function createNewNote() {
        const currentSublist = listItemObject.subList || [];
        const newID = uniqid("note-");
        set(ref(fireData, `notes/${newID}`), {
            date: "",
            done: false,
            expanded: true,
            hasDate: false,
            name: "",
            subList: [],
            isShared: false,
            listID: userInfo.currentHomeId,
        });

        updateFirebaseProperty(id, "subList", [...currentSublist, newID]);
    }

    const toggleChildrenVisible = () => {
        updateFirebaseProperty(id, "expanded", !childrenVisible);
    };

    const removeCurrentInput = () => {
        const cascadingChildrenRemoval = async (noteId) => {
            const response = await get(child(ref(fireData), `notes/${noteId}`));
            const data = response.val().subList;

            if (data !== [] && data) {
                return data.forEach((listItemId) => {
                    cascadingChildrenRemoval(listItemId);
                    remove(ref(fireData, `notes/${listItemId}`));
                });
            }
            return remove(ref(fireData, `notes/${noteId}`));
        };

        cascadingChildrenRemoval(id)
            .then(() =>
                updateFirebaseProperty(
                    urlParent,
                    "subList",
                    filteredParentSublist === [] ? [] : filteredParentSublist
                )
            )
            .then(() => {
                setTimeout(() => {
                    setLocalAnimationState(false);
                }, 300);
            })
            .then(() => remove(ref(fireData, `notes/${id}`)));
    };

    const removeDate = () => {
        remove(ref(fireData, `notes/${id}/date`));
        update(ref(fireData, `notes/${id}`), { ["hasDate"]: false });
    };

    const moveUpCurrentInput = () => {
        const swappedIndex = parentSublist.indexOf(id);
        if (!isFirstInList) {
            const swapped = parentSublist[swappedIndex - 1];
            parentSublist[swappedIndex - 1] = parentSublist[swappedIndex];
            parentSublist[swappedIndex] = swapped;
            updateFirebaseProperty(urlParent, "subList", parentSublist);
        }
    };

    const moveDownCurrentInput = () => {
        const swappedIndex = parentSublist.indexOf(id);
        if (!isLastInList) {
            const swapped = parentSublist[swappedIndex + 1];
            parentSublist[swappedIndex + 1] = parentSublist[swappedIndex];
            parentSublist[swappedIndex] = swapped;
            updateFirebaseProperty(urlParent, "subList", parentSublist);
        }
    };

    const toggleIsMarkedAsDone = () => {
        updateFirebaseProperty(id, "done", !isMarkedAsDone);
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
                                    userInfo={userInfo}
                                    setIsDialogOn={setIsDialogOn}
                                    id={id}
                                />
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
                                            moveUpCurrentInput={moveUpCurrentInput}
                                            moveDownCurrentInput={moveDownCurrentInput}
                                            isMarkedAsDone={isMarkedAsDone}
                                            toggleIsMarkedAsDone={toggleIsMarkedAsDone}
                                            setIsDialogOn={setIsDialogOn}
                                            removeDate={removeDate}
                                            createNewNote={createNewNote}
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
                                        removeCurrentInput={removeCurrentInput}
                                        listItemObject={listItemObject}
                                        isMarkedAsDone={isMarkedAsDone}
                                        createNewNote={createNewNote}
                                        parentList={parentList}
                                    />
                                    <ListElementDate
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

                                        {listItemObject.subList?.map((id, index) => (
                                            <CSSTransition
                                                timeout={300}
                                                classNames={"pageMain"}
                                                unmountOnExit
                                                key={id}
                                            >
                                                <>
                                                    <ListItem
                                                        userInfo={userInfo}
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
