import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { PALLETE } from "../../Colors/colors";

export const HeaderContainer = styled.div`
    display: flex;
    height: 7rem;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem;
    font-size: 1.4rem;
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
    cursor: pointer;
    color: ${PALLETE.secondary};
    &:hover {
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
    border-radius:${props => props.isDropdownExt ? "0.5rem 0.5rem 0 0 " : "0.5rem"};
    border: 1px solid ${PALLETE.secondary};
    ${props => props.isDropdownExt && "border-bottom: none;"}
    padding: 1rem 2.5rem;
    cursor: pointer;
    background: ${PALLETE.secondary};
    color: #fff;
    transition: opacity 0.2s;
    z-index: 5;
    user-select: none;
    box-shadow: 0 1px 6px 0 rgb(128 128 128 / 80%);

    &:hover{
        opacity: ${props => props.isDropdownExt ? "1" : ".9"};
    }
`

export const DropdownListMenu = styled.ul`
    z-index: 3;
    position: absolute;
    width: 100%;
    top: 100%;
    left:0;
    list-style: none;
    background: white;
    border-top: none;
    overflow: hidden;
    color: ${PALLETE.secondary};
    background-color: ${PALLETE.lightGrey};
    overflow: hidden;
    border-radius: 0 0 .6rem 0.6rem;
    box-shadow: 0 1px 6px 0 rgb(128 128 128 / 80%);
    /* box-shadow: 1px 3px 8px 0 ${PALLETE.greyOpacity}; */
`

export const DropDownListItemsWrapper = styled.div`
    border-radius: 0 0 .6rem .6rem;
    overflow: hidden;
    box-shadow: 0 1px 2px -0.5px rgb(128 128 128 / 80%);
`

export const DropdownListMenuItem = styled.li`
    padding: 1rem 1.5rem;
    background-color: white;
    margin: 0;
    width: 100%;
    border-top: 1px solid ${PALLETE.secondaryST};
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover{
        background: ${PALLETE.lightGrey};
    }
`

export const DropdownListMenuNewItem = styled(DropdownListMenuItem)`
    background-color: transparent;
    padding: .8rem 1.5rem;
    border: none;
    border-radius: 0 0 .8rem 0.8rem;
    font-weight: 700;
    color: ${PALLETE.grey};
    display: flex;
    justify-content: center;
    transition: color 0.3s;
    &:hover{
        background-color: transparent;
        color: ${PALLETE.active};
    }
`

export const DisplayModeToggleContainer = styled.div`

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
