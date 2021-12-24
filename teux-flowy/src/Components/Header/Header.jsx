import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    border-bottom: 1px solid black;
    justify-content: center;
`;

const BreadcrumbsContainer = styled.ul`
    display: flex;
`;

const BreadcrumbElement = styled.li`
    padding: 10px;
`;

const NodeUrlLink = styled.a`
    text-decoration: none;
    color: inherit;
    font-weight: 700;
`;

const BreadcrumbCurrentElement = styled.span`
    padding: 10px;
`;

function Header({ idPath, setGlobalState }) {
    const parentList = idPath.currentPath;

    useEffect(() => {
        const namesList = [];

        if (idPath.currentPath.length >= 1) {
            Promise.all(
                parentList.forEach((parent) => {
                    fetch(`http://localhost:3000/notes/${parent}`)
                        .then((res) => res.json())
                        .then((data) => {
                            namesList.push(data.name);
                        })
                        .then(() => {
                            setGlobalState({
                                ...idPath,
                                names: namesList,
                            });
                        });
                })
            );
        }
    }, [idPath.currentPath]);

    return (
        <HeaderContainer>
            <BreadcrumbsContainer>
                {idPath.currentPath.map((parent, index) => {
                    const nodeUrl = "/" + idPath.currentPath.slice(0, index + 1).join(":");
                    return (
                        <>
                            {index !== idPath.currentPath.length - 1 && (
                                <>
                                    <BreadcrumbElement>
                                        <NodeUrlLink href={nodeUrl}>
                                            {idPath.names[index]}
                                        </NodeUrlLink>
                                    </BreadcrumbElement>
                                    <BreadcrumbElement role="img" aria-label="Play Button">
                                        &#9654;&#65039;
                                    </BreadcrumbElement>
                                </>
                            )}
                        </>
                    );
                })}
                <BreadcrumbCurrentElement>
                    {idPath.names[idPath.names.length - 1]}
                </BreadcrumbCurrentElement>
            </BreadcrumbsContainer>
        </HeaderContainer>
    );
}

export { Header };
