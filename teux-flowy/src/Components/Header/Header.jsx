import {  useEffect } from "react";
import styled from "styled-components";
import * as S from "./StylesHeader";


function Header({ idPath, setGlobalState, cssAnimationState, setCssAnimationState }) {

    return (
        <S.HeaderContainer>
            <S.BreadcrumbsContainer>
                {idPath.currentPath.map((parent, index) => {
                    return (
                        <>
                            {index !== idPath.currentPath.length - 1 && (
                                <>
                                    <S.BreadcrumbElement>
                                        <S.NodeUrlLink
                                            onClick = {() => {
                                                setCssAnimationState(false);

                                                setTimeout(() => {
                                                    setGlobalState({
                                                        names: idPath.names.slice(0,index+1),
                                                        currentPath: idPath.currentPath.slice(0,index+1),
                                                    })
                                                }, 300);

                                            }}
                                        >
                                            {idPath.names[index]}
                                        </S.NodeUrlLink>
                                    </S.BreadcrumbElement>
                                    <S.BreadcrumbDivider role="img" aria-label="Play Button">
                                        &#9654;&#65039;
                                    </S.BreadcrumbDivider>
                                </>
                            )}
                        </>
                    );
                })}
                <S.BreadcrumbCurrentElement>
                    {idPath.names[idPath.names.length - 1]}
                </S.BreadcrumbCurrentElement>
            </S.BreadcrumbsContainer>
        </S.HeaderContainer>
    );
}

export { Header };
