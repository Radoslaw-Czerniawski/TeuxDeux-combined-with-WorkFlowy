import * as S from "./StylesHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHome, faBars } from '@fortawesome/fontawesome-free-solid'



function Header({ idPath, setGlobalState }) {
    return (
        <S.HeaderContainer>
            <S.BreadcrumbsContainer>
                <S.BreadcrumbElement key="home">
                    <S.NodeUrlLink
                        onClick = {() => {
                            setGlobalState({
                                names: ["HOME"],
                                currentPath: ["HOME"],
                                })
                            }
                        }
                    >
                        <FontAwesomeIcon icon={faHome} size="2x" />
                    </S.NodeUrlLink>
                    
                </S.BreadcrumbElement>
                {console.log(idPath.currentPath)}
                {console.log(idPath.names)}
                {idPath.currentPath.map((parent, index) => {
                    return index != 0 ? (
                        <>
                            {(
                                <>
                                    <S.BreadcrumbDivider key={`divider-${index}`} role="img" aria-label="Play Button">
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </S.BreadcrumbDivider>
                                    <S.BreadcrumbElement key={index}>
                                        <S.NodeUrlLink
                                            onClick = {() => {
                                                setGlobalState({
                                                    names: idPath.names.slice(0,index+1),
                                                    currentPath: idPath.currentPath.slice(0,index+1),
                                                    })
                                                }
                                            }
                                        >
                                            {idPath.names[index]}
                                        </S.NodeUrlLink>
                                    </S.BreadcrumbElement>
                                    
                                </>
                            )}
                        </>
                    ) : null ;
                })}
            </S.BreadcrumbsContainer>
            <S.HamburgerMenuButton>
                <FontAwesomeIcon icon={faBars} size="2x"/>
            </S.HamburgerMenuButton>
        </S.HeaderContainer>
    );
}

export { Header };