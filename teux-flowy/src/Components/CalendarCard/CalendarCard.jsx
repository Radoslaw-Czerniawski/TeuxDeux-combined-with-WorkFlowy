import { getDay, format, previousDay, addDays, isToday, parseJSON } from "date-fns";
import { useEffect, useRef, useState } from "react";
import * as S from "./StylesCalendarCard";
import { db as fireData } from "../../DB/DB";
import {
    ref,
    onValue,
    set,
    push,
    update,
    remove,
    get,
    child,
    query,
    orderByKey,
    equalTo,
    orderByChild,
    off,
} from "firebase/database";

const CalendarCard = ({ date, homeId }) => {
    const [fetchedData, setFetchedData] = useState([]);
    const [allNotesFetched, setAllNotesFetched] = useState(false);

    useEffect(() => {
        homeId && onValue(
            query(
                ref(fireData, "notes"),
                orderByChild(`listID`),
                equalTo(homeId)
            ),
            (snapshot) => {
                if (!snapshot.exists()) {
                    setFetchedData([]);
                } else {
                    const data = snapshot.val();

                    const filteredNotes = Object.values(data).filter(note => note.date === date.toJSON())
                    const currentNotes = filteredNotes.map((item) => ({
                        name: item.name,
                        isDone: item.done
                    }));

                    setFetchedData(currentNotes);
                }
            }
        );
    }, [homeId])

    const notesRowsNumber = new Array(25).fill(0);

    return (
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
                                <S.NoteRow isDone={note.isDone}>
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
                                    {note.name}
                                </S.NoteRow>
                            </>
                        ))}
                    </ul>
                </S.CardNotesArea>
            </S.CardWrapper>
    );
};

export { CalendarCard };
