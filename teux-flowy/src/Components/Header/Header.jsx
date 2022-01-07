import * as S from "./StylesHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome, faBars, faList } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import { faCalendar }  from "@fortawesome/fontawesome-free-regular";

function Header({ idPath, setGlobalState, setCssAnimationState }) {
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
                                    names: ["HOME"],
                                    currentPath: ["HOME"],
                                });
                            }, 300);
                        }}
                    >
                        <FontAwesomeIcon icon={faHome} size="2x" />
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
                                        <S.BreadcrumbElement key={index}>
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
                                                {idPath.names[index]}
                                            </S.NodeUrlLink>
                                        </S.BreadcrumbElement>
                                    </>
                                }
                            </>
                        )
                    );
                })}
            </S.BreadcrumbsContainer>
            <S.MenuIconButton>
                <Link to="/calendar"> <FontAwesomeIcon icon={faCalendar} size="2x" /></Link>
            </S.MenuIconButton>
            <S.MenuIconButton>
                <Link to="/"><FontAwesomeIcon icon={faList} size="2x" /></Link>
            </S.MenuIconButton>
            <S.MenuIconButton>
                <FontAwesomeIcon icon={faBars} size="2x" />
            </S.MenuIconButton>
        </S.HeaderContainer>
    );
}

export { Header };
