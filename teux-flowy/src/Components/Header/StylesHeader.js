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

export const DisplayModeToggleContainer = styled.div`
   margin: 0 2rem;
   display: flex;
`

export const StyledNavLink = styled(NavLink)`
    --border-radius: 2rem;
    height: 4rem;
    width: 4.6rem;
    padding: 1.2rem;
    display: flex;
    align-items: center;
    
    
    color: ${PALLETE.secondary};
    background: ${PALLETE.greyST};
    box-shadow: inset 5px 5px 5px -3px ${PALLETE.grey};
    transition: background-color 0.5s, color 0.5s;
    cursor: pointer;
    &:hover{
        opacity:0.8;
    }

    &.active {
        color: ${PALLETE.white};
        background: ${PALLETE.secondary};

    }
  `

export const StyledNavLinkLeft = styled(StyledNavLink)`
    border-radius: var(--border-radius)  0 0 var(--border-radius);
    justify-content: right;
`

export const StyledNavLinkRight = styled(StyledNavLink)`
    border-radius: 0 var(--border-radius) var(--border-radius)  0;
`