import * as S from "./StylesHeader";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome, faBars, faList } from "@fortawesome/fontawesome-free-solid";
import { longTextPreview } from "../../helpers/helpers"
import { faCalendar } from "@fortawesome/fontawesome-free-regular";

import uniqid from "uniqid";

function Header({ idPath, setGlobalState, setCssAnimationState, userInfo }) {

    const [isDropdownExt, setIsDropdownExt] = useState(false);

    return (
        <S.HeaderContainer>
            <S.BreadcrumbsContainer>
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
                {idPath.currentPath.map((parent, index) => {
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
            </S.BreadcrumbsContainer>

            {/* DROPDOWN WITH CHOOSING LIST */}
            {userInfo.isLogged && <S.DropdownListMenuButton
                onClick={setIsDropdownExt(oldState => !oldState)}
                >
                Current notes
                <S.DropdownListMenu>
                    <S.DropdownListMenuItem>
                        + new list
                    </S.DropdownListMenuItem>
                    <S.DropdownListMenuItem>
                        List item
                    </S.DropdownListMenuItem>
                    <S.DropdownListMenuItem>
                        List item
                    </S.DropdownListMenuItem>
                </S.DropdownListMenu>
            </S.DropdownListMenuButton>}

            {/* SWITCH NOTES VIEW */}
            {userInfo.isLogged && <S.DisplayModeToggleContainer>
                <S.StyledNavLinkLeft onClick={() => {
                    setGlobalState({
                        names: [],
                        currentPath: [],
                    });
                }}
                to="/calendar">
                    <FontAwesomeIcon icon={faCalendar} size="1x" />
                </S.StyledNavLinkLeft>


                <S.StyledNavLinkRight to="/">
                    <FontAwesomeIcon icon={faList} size="1x" />
                </S.StyledNavLinkRight>
            </S.DisplayModeToggleContainer>}
        </S.HeaderContainer>
    );
}

export { Header };
