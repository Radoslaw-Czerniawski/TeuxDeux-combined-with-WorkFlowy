import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

const ToggleChildrenVisibiltyButton = styled.button`
    width: 10px;
    height: 8px;
    padding: 5px;
    margin: 5px;
    border: none;
    clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
    background: #aaa;
    opacity: 0.6;
    cursor: pointer;
    transition: transform 0.3s;
    transform: ${(props) => props.childrenVisible ? "none" : "rotate(-90deg)"};
    visibility:  ${(props) => props.subList[0] ? "visible" : "hidden"};

`

export const ToggleVisibilty = ({childrenVisible, toggleChildrenVisible, subList}) => {
    return (
        <ToggleChildrenVisibiltyButton
            childrenVisible={childrenVisible}
            subList={subList}
            onClick={ () => toggleChildrenVisible() }
        >

        </ToggleChildrenVisibiltyButton>
    );
}
