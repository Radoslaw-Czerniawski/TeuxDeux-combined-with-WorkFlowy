import * as S from "./StylesCalendarCard";

const CalendarCard = ({mainHeading, headingContent}) => {

    return (
        <S.CardWrapper>
            <S.CardHeader>
                <S.MainHeadingDay>{mainHeading}</S.MainHeadingDay>
                <S.HeadingFullDate>{headingContent}</S.HeadingFullDate>
            </S.CardHeader>

            <S.CardNotesArea>

            </S.CardNotesArea>
        </S.CardWrapper>
    )
}

export {CalendarCard};
