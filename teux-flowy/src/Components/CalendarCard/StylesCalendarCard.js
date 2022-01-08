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
    padding: 1rem;
`;

export const MainHeadingDay = styled.h2`
    font-size: 2.4rem;
    font-weight: bold;
`;

export const HeadingFullDate = styled.p`
    font-size: 1.4rem;
    margin-top: 1rem;
`

export const CardNotesArea = styled.div`
    padding: 0;
    margin: 4rem 1rem 2rem;
    height: 45vh;
    background-attachment: local;
    overflow-y: auto;
    text-align:left;
    display: flex;
    flex-direction: column;
    --spacing: 3.1rem;
    --spacing2: 3.2rem;
    --spacing3: 3.2rem;
    background-image: repeating-linear-gradient(
        transparent,
        transparent var(--spacing),
        ${PALLETE.greyOpacity} var(--spacing),
        ${PALLETE.greyOpacity} var(--spacing2),
        transparent var(--spacing2),
        transparent var(--spacing3)
    );
    /* SCROLLBAR */
    scrollbar-width: thin;
    scrollbar-color: ${PALLETE.grey} ;
    &::-webkit-scrollbar {
    width: 12px;
    }
    &::-webkit-scrollbar-track {
    }
    &::-webkit-scrollbar-thumb {
    background-color: ${PALLETE.grey};
    border-radius: 20px;
    border: 3px solid white;
    }
}
`;

export const NoteRow = styled.li`
    font-size: 1.4rem;
    padding: 0 1rem;
    line-height: 2.28;
    list-style-type: circle;
`

