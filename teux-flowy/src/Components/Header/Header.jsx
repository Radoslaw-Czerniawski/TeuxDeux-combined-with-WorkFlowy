import * as S from "./StylesHeader";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faHome,
    faBars,
    faList,
    faPlusCircle,
    faTrash,
    faCircle,
    faMinusCircle,
    faTrashAlt,
    faTransgender,
    faXRay,
} from "@fortawesome/fontawesome-free-solid";
import { longTextPreview } from "../../helpers/helpers";
import { faCalendar } from "@fortawesome/fontawesome-free-regular";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Profile } from "../Profile/Profile";
import uniqid from "uniqid";
import { db as fireData } from "../../DB/DB";
import {
    ref,
    onValue,
    set,
    push,
    update,
    remove,
    get,
    child,
    query,
    orderByKey,
    equalTo,
    orderByChild,
    off,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

export const addListToUser = (listID, userUID) => {
    return update(ref(fireData, `users/${userUID}/`), { [listID]: "" });
};

const createNewList = (userInfo) => {
    if (!userInfo.isLogged) {
        return;
    }

    const newListRef = ref(fireData, `notes/`);
    const key = push(newListRef);

    const newList = {
        date: "",
        done: false,
        users: {
            [userInfo.userUID]: {
                hasAccess: true,
                displayName: userInfo.displayName,
            },
        },
        expanded: true,
        hasDate: false,
        name: "My new list",
        subList: [],
        isShared: false,
    };

    const newListID = key._path.pieces_[1];

    set(key, newList);
    addListToUser(newListID, userInfo.userUID);
    return newListID;
};

function Header({ idPath, setGlobalState, setCssAnimationState, userInfo, setUserInfo }) {
    const [isDropdownExt, setIsDropdownExt] = useState(false);
    const [currentNotesNames, setCurrentNotesNames] = useState([]);
    const [currentListTitle, setCurrentListTitle] = useState("");

    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownExt(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, []);


    const location = useLocation().pathname;
    const isSwitchViewVButtonVisible = location === "/" || location === "/calendar";
    const isListTitleVisible = location === "/calendar";

    const removeList = async (id) => {
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

        const note = await get(child(ref(fireData), `notes/${id}`));
        const noteData = note.val();

        if (Object.keys(noteData.users).length > 1) {
            remove(ref(fireData, `notes/${id}/users/${userInfo.userUID}`));
            remove(ref(fireData, `users/${userInfo.userUID}/${id}`));
            if (id === userInfo.currentHomeId) {
                setUserInfo((oldState) => ({
                    ...oldState,
                    currentHomeId: "",
                }));
            }
        } else if (Object.keys(noteData.users).length === 1) {
            cascadingChildrenRemoval(id).then(() => {
                remove(ref(fireData, `notes/${id}`));
                remove(ref(fireData, `users/${userInfo.userUID}/${id}`));
                if (id === userInfo.currentHomeId) {
                    setUserInfo((oldState) => ({
                        ...oldState,
                        currentHomeId: "",
                    }));
                    setCurrentListTitle("");
                }
            });
        }
    };

    useEffect(() => {
        if (userInfo.isLogged) {
            onValue(
                query(
                    ref(fireData, "notes"),
                    orderByChild(`users/${userInfo.userUID}/hasAccess`),
                    equalTo(true)
                ),
                (snapshot) => {
                    if (!snapshot.exists()) {
                        setCurrentNotesNames(null);
                    } else {
                        const data = snapshot.val();
                        const currentNotes = Object.keys(data).map((key) => ({
                            name: data[key].name,
                            id: key,
                        }));
                        setCurrentNotesNames(currentNotes);
                    }
                }
            );
        }

        return () => {};
    }, [userInfo.isLogged]);

    return (
        <S.HeaderContainer>
            {!isListTitleVisible && <S.BreadcrumbsContainer>
                <S.BreadcrumbElement key="home">
                    <S.NodeUrlLink
                        to="/"
                        onClick={() => {
                            setCssAnimationState(false);

                            setTimeout(() => {
                                setGlobalState({
                                    names: [],
                                    currentPath: [],
                                });
                            }, 300);
                        }}
                    >
                        <FontAwesomeIcon icon={faHome} size="1x" />
                    </S.NodeUrlLink>
                </S.BreadcrumbElement>
                {idPath?.currentPath.map((parent, index) => {
                    return (
                        index !== 0 && (
                            <>
                                {
                                    <>
                                        <S.BreadcrumbDivider
                                            key={`divider-${index}`}
                                            role="img"
                                            aria-label="Play Button"
                                        >
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </S.BreadcrumbDivider>
                                        <S.BreadcrumbElement key={uniqid()}>
                                            <S.NodeUrlLink
                                                onClick={() => {
                                                    setCssAnimationState(false);

                                                    setTimeout(() => {
                                                        setGlobalState({
                                                            names: idPath.names.slice(0, index + 1),
                                                            currentPath: idPath.currentPath.slice(
                                                                0,
                                                                index + 1
                                                            ),
                                                        });
                                                    }, 300);
                                                }}
                                            >
                                                {longTextPreview(idPath.names[index], 20, true)}
                                            </S.NodeUrlLink>
                                        </S.BreadcrumbElement>
                                    </>
                                }
                            </>
                        )
                    );
                })}
            </S.BreadcrumbsContainer>}

            {isListTitleVisible && <S.ListTitle>
                {currentListTitle}
            </S.ListTitle>}

            {/* DROPDOWN WITH CHOOSING LIST */}
            {userInfo.isLogged && isSwitchViewVButtonVisible && (
                <S.DropdownContainer ref={dropdownRef}>
                    <S.DropdownListMenuButton
                        onClick={() => setIsDropdownExt((oldState) => !oldState)}
                        isDropdownExt={isDropdownExt}
                    >
                        Current notes
                    </S.DropdownListMenuButton>
                    <CSSTransition
                        in={isDropdownExt}
                        timeout={300}
                        classNames={"dropdown"}
                        unmountOnExit
                    >
                        <S.DropdownListMenu>
                            <S.DropDownListItemsWrapper>
                                <TransitionGroup>
                                    {currentNotesNames?.map((note) => (
                                        <CSSTransition
                                            timeout={300}
                                            classNames={"dropdown"}
                                            unmountOnExit
                                            key={note.id}
                                        >
                                            <S.DropdownListMenuItem
                                                onClick={() => {
                                                    setCurrentListTitle(note.name)
                                                    setUserInfo((oldState) => ({
                                                        ...oldState,
                                                        currentHomeId: note.id,
                                                    }));
                                                }}
                                            >
                                                {note.name}
                                                <S.RemoveNoteButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeList(note.id);

                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faMinusCircle} />
                                                </S.RemoveNoteButton>
                                            </S.DropdownListMenuItem>
                                        </CSSTransition>
                                    ))}
                                </TransitionGroup>
                            </S.DropDownListItemsWrapper>
                            <S.DropdownListMenuNewItem
                                onClick={() => {
                                    const newListID = createNewList(userInfo, setIsDropdownExt);
                                    setUserInfo((oldState) => ({
                                        ...oldState,
                                        currentHomeId: newListID,
                                    }));
                                }}
                            >
                                <FontAwesomeIcon icon={faPlusCircle} size="1x" /> New Note
                            </S.DropdownListMenuNewItem>
                        </S.DropdownListMenu>
                    </CSSTransition>
                </S.DropdownContainer>
            )}

            {/* SWITCH NOTES VIEW */}
            {userInfo.isLogged && isSwitchViewVButtonVisible && (
                <S.DisplayModeToggleContainer>
                    <S.StyledNavLinkLeft
                        onClick={() => {
                            setGlobalState({
                                names: [],
                                currentPath: [],
                            });
                        }}
                        to="/calendar"
                    >
                        <FontAwesomeIcon icon={faCalendar} size="1x" />
                    </S.StyledNavLinkLeft>

                    <S.StyledNavLinkRight to="/">
                        <FontAwesomeIcon icon={faList} size="1x" />
                    </S.StyledNavLinkRight>
                </S.DisplayModeToggleContainer>
            )}

            <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
        </S.HeaderContainer>
    );
}

export { Header };
