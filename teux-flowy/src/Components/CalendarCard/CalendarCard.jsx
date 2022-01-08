import { getDay, format, previousDay, addDays, isToday } from "date-fns";
import * as S from "./StylesCalendarCard";

const CalendarCard = ({date}) => {

    const notesRowsNumber = new Array(25).fill(0);

    return (
        <S.CardWrapper date={date}>
            <S.CardHeader>
                <S.MainHeadingDay>{(format(date, "eeee")).toUpperCase()}</S.MainHeadingDay>
                <S.HeadingFullDate>{(format(date, "MMMM do yyyy")).toUpperCase()}</S.HeadingFullDate>
            </S.CardHeader>
            <S.CardNotesArea>
                {isToday(date) && notesRowsNumber.map(note => (
                    <S.NoteRow>wow</S.NoteRow>
                ))}
            </S.CardNotesArea>
        </S.CardWrapper>
    )
}

export {CalendarCard};
