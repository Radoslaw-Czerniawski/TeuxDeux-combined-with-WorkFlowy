import { getDay, format, previousDay, addDays } from "date-fns";
import * as S from "./StylesCalendarCard";

const CalendarCard = ({date}) => {

    return (
        <S.CardWrapper>
            <S.CardHeader>
                <S.MainHeadingDay>{(format(date, "eeee")).toUpperCase()}</S.MainHeadingDay>
                <S.HeadingFullDate>{(format(date, "MMMM do yyyy")).toUpperCase()}</S.HeadingFullDate>
            </S.CardHeader>

            <S.CardNotesArea>

            </S.CardNotesArea>
        </S.CardWrapper>
    )
}

export {CalendarCard};
