import styled from "styled-components";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import {useState} from "react";

const StyledDialog = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index:10;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
`

const DatePickerContainer = styled.div`
    width:40%;
    min-width:30rem;
    padding: 2rem;
    align-text: center;
    background: #fff;
    border-radius: 1rem;
`
const patchDate = (id, pickedDate) => {
    fetch(`http://localhost:3000/notes/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            hasDate: true,
            date: pickedDate,
        }),
    })
}

const Dialog = ({setDialogParams, dialogParams}) => {
    const [pickedDate, setPickedDate] = useState(new Date);
    

    return <StyledDialog onClick={() => setDialogParams({...dialogParams, isOn: false})}>
        <DatePickerContainer onClick={(e) => {
            e.stopPropagation();
        }}>
            <Calendar onChange={(value, event) => setPickedDate(value)}/>
            {console.log(pickedDate.getDate(),pickedDate.getMonth(), pickedDate.getFullYear())}
            <button onClick={() => {
                patchDate(dialogParams.id, pickedDate.toJSON());
                setDialogParams({...dialogParams, isOn: false})
                console.log(pickedDate)}
            }>Confirm</button>
        </DatePickerContainer>
    </StyledDialog>
}
 
export default Dialog;