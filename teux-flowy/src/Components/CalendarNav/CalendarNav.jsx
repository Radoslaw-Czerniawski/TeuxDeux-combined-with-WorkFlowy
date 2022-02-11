import { PALLETE } from "../../Colors/colors";
import styled from "styled-components";
import { addMonths, addWeeks } from "date-fns";

export const CalendarNav = ({setActiveDay, activeDay}) => {

    const changeDay = (dWeeks, dMonths) => {
        const newDay = addMonths(addWeeks(activeDay, dWeeks), dMonths);
        setActiveDay(newDay);
    }   

    return ( 
        <StyledCalNav>
            <StyledCalNavButton onClick={()=>changeDay(0, -1)}>
                -month
            </StyledCalNavButton>
            <StyledCalNavButton onClick={()=>changeDay(-1, 0)}>
                -week
            </StyledCalNavButton>
            <StyledCalNavButton onClick={()=>setActiveDay(Date.now())}>
                today
            </StyledCalNavButton>
            <StyledCalNavButton onClick={()=>changeDay(1, 0)}>
                +week
            </StyledCalNavButton>
            <StyledCalNavButton onClick={()=>changeDay(0, 1)}>
                +month
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
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.4s;
    &:hover{
        background: ${PALLETE.lightST};
    }
`