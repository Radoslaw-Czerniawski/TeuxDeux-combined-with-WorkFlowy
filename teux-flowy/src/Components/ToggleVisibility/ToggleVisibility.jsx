import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

const ToggleChildrenVisibiltyButton = styled.button`
    width: .8rem;
    height: .8rem;
    position:relative;
    margin: 0 1rem;
    padding: 0;
    &:hover {
        &:after {
            content: "";
            position: absolute;
            display: block;
            width: 2rem;
            height: 2rem;
            border-radius: 100%;
            left: -.6rem;
            top: -.6rem;
            opacity: .2;
            background: black;
        }
    }
    border: none;
    background: transparent;
    opacity: 0.6;
    cursor: pointer;
    transition: transform 0.3s;
    transform: ${(props) => props.childrenVisible ? "none" : "rotate(-90deg)"};
    visibility:  ${(props) => props.subList[0] && !props.isFirst ? "visible" : "hidden"};
`
const TriangleInsideToggleVisibiltyButton = styled.div`
    position: absolute;
    top: 0;
    left: -1px;
    width: 10px;
    height: 9px;
    border: none;
    clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
    background: black;
`

export const ToggleVisibilty = ({childrenVisible, toggleChildrenVisible, isFirst, subList}) => {
    return (
        <ToggleChildrenVisibiltyButton
            isFirst={isFirst}
            childrenVisible={childrenVisible}
            subList={subList}
            onClick={ () => toggleChildrenVisible() }
        >
            <TriangleInsideToggleVisibiltyButton/>
        </ToggleChildrenVisibiltyButton>
    );
}
