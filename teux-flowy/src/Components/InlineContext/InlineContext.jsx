import styled from "styled-components";
import React, { useRef, useEffect } from "react";

const StyledInlineContext = styled.ul`
    position: absolute;
    top: 0px;
    right: 100%;
    background: white;
    z-index:10;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: .5rem .5rem 1.5rem -1rem;
`

const StyledInlineContextOption = styled.li`
    font-size: 1.2rem;
    padding: 1rem 2rem;
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
    &:hover {
        background: #ccf
    }
    &:disabled {
        color: #ccc;
    }
`

const useOutsideClickDetector = (ref, setIsInlineContextVisibile) => {
    useEffect(() => {

        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsInlineContextVisibile(false);
                console.log("InlineContext", e);
            }
        }

        document.addEventListener("mousedown", handleClickOutside, true);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true)
        }
    })
}



export const InlineContext = ({isFirst, setIsInlineContextVisibile, removeCurrentInput}) => {

    const OPTIONS_HANDLER_LIST = [
        {name: "Delete", onClickHandler: removeCurrentInput, disabled: {isFirst}},
        {name: "Move up", onClickHandler: removeCurrentInput, disabled: {isFirst}},
        {name: "Move down", onClickHandler: removeCurrentInput, disabled: {isFirst}}
    ]

    const wrapperRef = useRef(null);
    useOutsideClickDetector(wrapperRef, setIsInlineContextVisibile);

    return ( 
        <StyledInlineContext ref={wrapperRef}>
            { OPTIONS_HANDLER_LIST.map((option) => {
                console.log(option.disabled)
                return <StyledInlineContextOption 
                            onClick={!option.disabled ? option.onClickHandler : null}
                        >
                    {option.name}
                </StyledInlineContextOption>
            })}
        </StyledInlineContext>
     );
}
 
export default InlineContext;

// UseOutsideClickDetector: 
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component