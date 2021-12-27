import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    border-bottom: 1px solid black;
    justify-content: center;
    align-items: center
    padding: 10px;
`;

export const BreadcrumbsContainer = styled.ul`
    display: flex;
`;

export const BreadcrumbDivider = styled.li`
    user-select:none;
    padding: 10px;
`;

export const BreadcrumbElement = styled(BreadcrumbDivider)`

    &:hover {
        cursor: pointer;
        opacity: .5;
    }
`;



export const NodeUrlLink = styled.a`
    padding: 10px;
    text-decoration: none;
    color: inherit;
    font-weight: 700;
`;

export const BreadcrumbCurrentElement = styled.span`
    padding: 10px;
    user-select:none;

`;
