import { getDay, format, previousDay, addDays, isToday, parseJSON } from "date-fns";
import { useEffect, useRef, useState } from "react";
import * as S from "./StylesCalendarCard";


const CalendarCard = ({ date }) => {
    const [fetchedData, setFetchedData] = useState([]);
    const [allNotesFetched, setAllNotesFetched] = useState(false);

    useEffect(() => {
        Promise.resolve(
            fetch(`http://localhost:3000/dates/${JSON.stringify(date).replace(/"/g, "")}`)
                .then((res) => res.json())
                .then((data) => {
                    let accumulator = [];
                    Promise.resolve(data.notes.forEach((note) => {
                        fetch(`http://localhost:3000/notes/${note}`)
                            .then((res) => res.json())
                            .then((data) => {
                                accumulator = [...accumulator, data.name]
                            })
                            .then(() => setFetchedData([
                                ...accumulator,
                            ]))
                    }))

                })
        )
        .finally(() => {
            setAllNotesFetched(true)
        })
    }, [])

    const notesRowsNumber = new Array(25).fill(0);

    return (
        <>
            {allNotesFetched && (
                <S.CardWrapper date={date}>
                    <S.CardHeader>
                        <S.MainHeadingDay>{format(date, "eeee").toUpperCase()}</S.MainHeadingDay>
                        <S.HeadingFullDate>
                            {format(date, "MMMM do yyyy").toUpperCase()}
                        </S.HeadingFullDate>
                    </S.CardHeader>
                    <S.CardNotesArea>
                        <ul
                            style={{
                                "margin-top": ".3rem",
                            }}
                        >
                            {fetchedData.map((note) => (
                                <>
                                    <S.NoteRow>
                                        <span
                                            style={{
                                                "position": "absolute",
                                                "top": "-.5rem",
                                                "left": "-.1rem",
                                                "font-size": "1.8rem"
                                            }}
                                        >
                                            •
                                        </span>
                                        {note}
                                    </S.NoteRow>
                                </>
                            ))}
                        </ul>
                    </S.CardNotesArea>
                </S.CardWrapper>
            )}
        </>
    );
};

export { CalendarCard };
