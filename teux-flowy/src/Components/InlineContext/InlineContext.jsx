import styled from "styled-components";
import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle,  faPlusSquare, faCalendar, faCalendarTimes, faCalendarCheck } from '@fortawesome/fontawesome-free-regular'
import { faChevronUp, faChevronDown, faCheck, faTrash } from '@fortawesome/fontawesome-free-solid'


const StyledInlineContext = styled.ul`
    position: absolute;
    width: 18rem;
    ${(props) =>  props.clickCords.y < 200 ? "top: 0;": "bottom: 0;"};
    ${(props) => props.clickCords.x > 380 ? "right: 100% ": "left: 4rem"};
    background: white;
    z-index:20;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: #222 .5rem .5rem 1.5rem -1rem;

`

const StyledInlineContextOption = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.isClickable ? "black" : "#ddd" };
    font-size: 1.2rem;
    padding: 1rem 2rem;
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
    &:hover {
        background: #ccf
    }
`

const StyledIconWrapperContextOption = styled.span`
    text-align: left;
    margin-right: 1.5rem;
`

const StyledTextWrapperContextOption = styled.span`
    text-align: right;
`

const useOutsideClickDetector = (ref, setIsInlineContextVisibile) => {
    useEffect(() => {

        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsInlineContextVisibile(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true)
        }
    })
}



export const InlineContext = ({
    id,
    inlineContextClickCoordinates,
    isFirst,
    isFirstInList,
    isLastInList,
    setIsInlineContextVisibile,
    removeCurrentInput,
    createNewNote,
    moveUpCurrentInput,
    moveDownCurrentInput,
    isMarkedAsDone,
    toggleIsMarkedAsDone,
    setIsDialogOn,
    removeDate,
    listItemObjectDate,

    }) => {

        const turnDialogOn = () => {
            setIsDialogOn(true);

        }

        const hasDate = listItemObjectDate.hasDate;

        const changeDateAndRemovePrevious = () => {
            removeDate();
            turnDialogOn();
        }

    // List containg all menu options with parameters such as
    // name = label of option
    // onClickHandler = fcn executed on click
    // isClickable = flag that enables/disables clickabilty
    // isAvailable = flag that shows/hides element when needed
    const OPTIONS_HANDLER_LIST = [
        {name: "Create subnote", onClickHandler: createNewNote,
        isClickable: true, isAvailable: true, icon: faPlusSquare},
        {name: "Move up", onClickHandler: moveUpCurrentInput,
        isClickable: !isFirstInList, isAvailable: true, icon: faChevronUp},
        {name: "Move down", onClickHandler: moveDownCurrentInput,
        isClickable: !isLastInList, isAvailable: true, icon: faChevronDown},
        {name: "Mark as done", onClickHandler: toggleIsMarkedAsDone,
        isClickable: true, isAvailable: !isMarkedAsDone, icon: faCheck},
        {name: "Mark as undone", onClickHandler: toggleIsMarkedAsDone,
        isClickable: true, isAvailable: isMarkedAsDone, icon: faCircle},
        {name: "Delete", onClickHandler: removeCurrentInput,
        isClickable: !isFirst, isAvailable: true, icon: faTrash},
        {name: "Set date", onClickHandler: turnDialogOn,
        isClickable: true, isAvailable: !hasDate, icon: faCalendar},
        {name: "Change date", onClickHandler: changeDateAndRemovePrevious,
        isClickable: true, isAvailable: hasDate, icon: faCalendarCheck},
        {name: "Remove date", onClickHandler: removeDate,
        isClickable: true, isAvailable: hasDate, icon: faCalendarTimes}
    ]

    const wrapperRef = useRef(null);
    useOutsideClickDetector(wrapperRef, setIsInlineContextVisibile);

    return (
            <StyledInlineContext onClick={()=>setIsInlineContextVisibile(false)} clickCords={inlineContextClickCoordinates} ref={wrapperRef}>
                { OPTIONS_HANDLER_LIST.map((option) => {
                    return option.isAvailable ? <StyledInlineContextOption
                                key={option.name}
                                isClickable = {option.isClickable}
                                onClick={option.isClickable ? option.onClickHandler : undefined}

                            >
                        <StyledIconWrapperContextOption>
                            <FontAwesomeIcon icon={option.icon} />
                        </StyledIconWrapperContextOption>
                        <StyledTextWrapperContextOption>
                            {option.name}
                        </StyledTextWrapperContextOption>


                    </StyledInlineContextOption> : null
                })}
            </StyledInlineContext>


     );
}

export default InlineContext;

// UseOutsideClickDetector:
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
