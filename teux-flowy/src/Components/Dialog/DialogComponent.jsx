import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { parseJSON } from "date-fns";
import { PALLETE } from "../../Colors/colors";
import { ref, get, child, update } from "firebase/database";
import { db as fireData } from "../../DB/DB";

const Dialog = ({ setIsDialogOn, id, userInfo }) => {

    const [pickedDate, setPickedDate] = useState(new Date());

    const updateDate = async (pickedDate) => {
        const res = await update(ref(fireData, `notes/${id}/`), {
            date: pickedDate,
            hasDate: "true,"
        });
        console.log(res)
        setIsDialogOn(false);
    };

    return (
        <StyledDialog onClick={() => setIsDialogOn(false)}>
            <DatePickerContainer
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <StyledTitle>Set date</StyledTitle>
                <StyledCalendar onChange={(value, event) => setPickedDate(value)} />
                <StyledConfirmButton
                    onClick={() => {
                        updateDate(pickedDate.toJSON())
                    }}
                >
                    Confirm
                </StyledConfirmButton>
            </DatePickerContainer>
        </StyledDialog>
    );
};

export default Dialog;

const StyledDialog = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${PALLETE.secondary};
`;

const DatePickerContainer = styled.div`
    padding: 2rem;
    align-text: center;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 7px 0px ${PALLETE.grey};
`;

const StyledConfirmButton = styled.button`
    cursor: pointer;
    display: block;
    margin: 2rem auto 0 auto;
    padding: 1rem 3rem;
    background: ${PALLETE.secondary};
    color: ${PALLETE.white};
    border-radius: 1rem;
    border: none;
    box-shadow: 1px 1px 7px 0px ${PALLETE.grey};
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.03);
        box-shadow: 1px 1px 7px 1px ${PALLETE.grey};
    }
    &:focus {
        transform: scale(0.97);
        box-shadow: 1px 1px 7px -1px ${PALLETE.grey};
    }
`;
const StyledTitle = styled.div`
    font-size: 2rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid  ${PALLETE.secondary};
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
`;

const StyledCalendar = styled(Calendar)`
    border: none;
`


