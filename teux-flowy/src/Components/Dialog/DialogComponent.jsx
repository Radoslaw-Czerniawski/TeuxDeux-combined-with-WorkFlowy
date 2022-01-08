import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { parseJSON } from "date-fns";
import { pick } from "lodash";

const StyledDialog = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DatePickerContainer = styled.div`
    padding: 2rem;
    align-text: center;
    background: #fff;
    border-radius: 1rem;
`;
const StyledConfirmButton = styled.button`
    cursor: pointer;
    display: block;
    margin: 2rem auto 0 auto;
    padding: 1rem 3rem;
    background: #47bf53;
    border-radius: 1rem;
    border: none;
    box-shadow: #416b46 0.3rem 0.3rem 2rem -0.1rem;
    &:hover {
        opacity: 0.9;
        box-shadow: #416b46 0.5rem 0.5rem 2rem -0.1rem;
    }
`;
const StyledTitle = styled.h1`
    font-size: 2rem;
`;
const patchDate = (id, pickedDate) => {
    return fetch(`http://localhost:3000/notes/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            hasDate: true,
            date: pickedDate,
        }),
    }).then(() => {
        const dateAdress = JSON.stringify(pickedDate).replace(/"/g, "");
        fetch(`http://localhost:3000/dates/${dateAdress}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.id) {
                    fetch(`http://localhost:3000/dates`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            id: pickedDate,
                            notes: [id]
                        }),
                    });
                } else {
                    fetch(`http://localhost:3000/dates/${dateAdress}`, {
                        method: "PATCH",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            notes: [
                                ...data.notes,
                                id,
                            ]
                        }),
                    })
                }
            });
    });
};

const Dialog = ({ setIsDialogOn, id, setNeedComponentReload }) => {
    const [pickedDate, setPickedDate] = useState(new Date());

    return (
        <StyledDialog onClick={() => setIsDialogOn(false)}>
            <DatePickerContainer
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <StyledTitle>Set date</StyledTitle>
                <Calendar onChange={(value, event) => setPickedDate(value)} />
                <StyledConfirmButton
                    onClick={() => {
                        patchDate(id, parseJSON(pickedDate))
                            .then(() => {
                                setIsDialogOn(false);
                            })
                            .then(() => {
                                setNeedComponentReload(true);
                            });
                    }}
                >
                    Confirm
                </StyledConfirmButton>
            </DatePickerContainer>
        </StyledDialog>
    );
};

export default Dialog;
