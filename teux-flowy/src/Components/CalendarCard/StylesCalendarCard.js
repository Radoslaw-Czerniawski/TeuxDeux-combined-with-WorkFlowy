import styled from "styled-components";
import {isBefore, isPast, isToday, isYesterday} from "date-fns";
import { PALLETE } from "../../Colors/colors";



const isItTodayOrYesterday = (date) => {
    if(isToday(date)) {
        return PALLETE.primary
    } else if(isBefore(date, Date.now())) {
        return PALLETE.greyOpacity
    }
    return PALLETE.black
}

export const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    color: ${(props) => isItTodayOrYesterday(props.date)};
`;

export const CardHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items:center;
    height: 100px;
    padding: 1rem;
`;

export const MainHeadingDay = styled.h2`
    font-size: 2.2rem;
    font-weight: bold;
`;

export const HeadingFullDate = styled.p`
    font-size: 1.2rem;
    margin-top: 1.5rem;
`

export const CardNotesArea = styled.div`
    padding: 1rem;
    height: 100%;
    text-align:left;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
`;


