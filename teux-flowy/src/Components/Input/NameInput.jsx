import { useState } from "react";
import styled, {  keyframes } from "styled-components";

const activeTextPulse = keyframes`
    0% {
        opacity: 100%;
    }
    50% {
        opacity: 50%;
    }
    100% {
        opacity: 100%;
    }
`

const NameInputField = styled.input`
    background: transparent;
    border: none;
    display: block;
    overflow: visible;
    width: 100%;
    &:active, &:focus {
        border: none;
        outline: none;
        animation: ${activeTextPulse} 1.6s infinite;
    }
`;

const NameInput = ({ listItemObject }) => {

    const initialValue = listItemObject.name;
    console.log(initialValue, listItemObject.id)

    const [dataValue, setDataValue] = useState(initialValue);

/*     const putNewInputValue = () => {
        return fetch(`http://localhost:3000/notes/${listItemObject.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: dataValue
            })
        })
    } */

    return <NameInputField type="text" value={dataValue} onChange={(e) => {
        setDataValue(e.target.value);
    }}  />;
};

export { NameInput };
