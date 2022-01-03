import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    height: 5rem;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem;
    box-shadow: #aaa 5px 0px 10px 1px;
`;

export const BreadcrumbsContainer = styled.ul`
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

export const BreadcrumbDivider = styled.li`
    display: flex;
    align-items: center;
    user-select:none;
`;

export const BreadcrumbElement = styled(BreadcrumbDivider)`

    &:hover {
        cursor: pointer;
        opacity: .5;
    }
`;

export const NodeUrlLink = styled.a`
    padding: 2rem;
    text-decoration: none;
    color: inherit;
    font-weight: 700;
`;

export const BreadcrumbCurrentElement = styled.span`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    user-select:none;

`;

export const HamburgerMenuButton = styled.div`
    height: auto;
`
