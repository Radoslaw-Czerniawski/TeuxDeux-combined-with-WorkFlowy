import { PALLETE } from "../../Colors/colors";
import styled from "styled-components";
import { addMonths, addWeeks } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleDoubleLeft, faAngleDoubleRight, faAngleRight } from "@fortawesome/fontawesome-free-solid";

export const CalendarNav = ({setActiveDay, activeDay, slidingSize}) => {

    const changeDay = (dWeeks, dMonths) => {
        const newDay = addMonths(addWeeks(activeDay, dWeeks), dMonths);
        setActiveDay(newDay);
    }

    const condition = slidingSize === 5 ? true : false;

    return (
        <StyledCalNav>
            <StyledCalNavButton onClick={()=>changeDay(0, -1)}>
                {condition ? "-month" : <FontAwesomeIcon icon={faAngleDoubleLeft} size="1x" />}
            </StyledCalNavButton>
            <StyledCalNavButton onClick={()=>changeDay(-1, 0)}>
                {condition ? "-week" : <FontAwesomeIcon icon={faAngleLeft} size="1x" />}
            </StyledCalNavButton>
            <StyledCalNavButton onClick={()=>setActiveDay(Date.now())}>
                today
            </StyledCalNavButton>
            <StyledCalNavButton onClick={()=>changeDay(1, 0)}>
                {condition ? "+week" : <FontAwesomeIcon icon={faAngleRight} size="1x" />}
            </StyledCalNavButton>
            <StyledCalNavButton onClick={()=>changeDay(0, 1)}>
                {condition ? "+month" : <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" />}
            </StyledCalNavButton>
        </StyledCalNav>
    );
}

const StyledCalNav = styled.div`
    margin: 4rem 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`

const StyledCalNavButton = styled.button`
    background: transparent;
    border: none;
    border-bottom: 1px solid ${PALLETE.secondary};
    padding: 1rem 3rem;
    border-radius: 1rem 1rem 0 0;
    color: ${PALLETE.secondary};
    text-transform: uppercase;
    font-size: 1.4rem;
    cursor: pointer;
    transition: background-color 0.4s;
    &:hover{
        background: ${PALLETE.lightST};
    }
`
