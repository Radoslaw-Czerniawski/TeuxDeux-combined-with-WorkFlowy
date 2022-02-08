import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { PALLETE } from "../../Colors/colors";

export const HeaderContainer = styled.div`
    display: flex;
    height: 7rem;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem;
    box-shadow: #aaa 5px 0px 10px 1px;
    z-index:0;
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
    color: ${PALLETE.greyOpacity};
`;

export const BreadcrumbElement = styled(BreadcrumbDivider)`

    color: ${PALLETE.secondary};

    &:hover {
        cursor: pointer;
        opacity: .5;
    }
`;

export const NodeUrlLink = styled.a`
    padding: 2rem;
    font-size: 1.4rem;
    text-decoration: none;
    color: inherit;
    font-weight: 700;
`;

export const BreadcrumbCurrentElement = styled.span`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    user-select: none;
`;

export const DropdownContainer = styled.div`
    position: relative;
`

export const DropdownListMenuButton = styled.div`
    min-width: 5rem;
    border-radius:${props => props.isDropdownExt ? "1rem 1rem 0 0 " : "1rem"};
    border: 1px solid ${PALLETE.grey};
    padding: 1rem 2rem;
    font-size: 1.4rem;
    transition: opacity 1s;

    background: #fff;
    &:hover{
        opacity: 0.3;
    }
`

export const DropdownListMenu = styled.li`
    position: absolute;
    width: 100%;
    top: 100%;
    left:0;
    list-style: none;
    background: white;
    border: 1px solid ${PALLETE.grey};
    border-radius: 0 0 1rem 1rem;
    border-top: none;
`

export const DropdownListMenuItem = styled.ul`
    padding: 1rem;
    margin: 1px;
    width: 100%;
    border-top: 1px solid ${PALLETE.grey};
`

export const DisplayModeToggleContainer = styled.div`
    font-size: 1.5rem;
    margin: 0 2rem;
    display: flex;
`

export const StyledNavLink = styled(NavLink)`
    --border-radius: 1rem;
    height: 4rem;
    width: 4rem;
    padding: 1.2rem;
    display: flex;
    align-items: center;


    color: ${PALLETE.secondary};
    background: ${PALLETE.greyST};
    box-shadow: inset 5px 5px 5px -3px ${PALLETE.grey};
    transition: background-color 0.2s, color 0.2s;
    cursor: pointer;
    &:hover{
        opacity:0.7;
    }

    &.active {
        color: ${PALLETE.white};
        background: ${PALLETE.secondary};
        box-shadow: none;
        cursor: default;
        opacity:1;
    }
  `

export const StyledNavLinkLeft = styled(StyledNavLink)`
    border-radius: var(--border-radius)  0 0 var(--border-radius);
    justify-content: right;
`

export const StyledNavLinkRight = styled(StyledNavLink)`
    border-radius: 0 var(--border-radius) var(--border-radius)  0;
`
