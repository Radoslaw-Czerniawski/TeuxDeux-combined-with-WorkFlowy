import { useCallback, useState } from "react";
import styled, {  keyframes } from "styled-components";
import debounce from "lodash/debounce"
import uniqid from "uniqid";
import { AppContext } from "../../ContextApi";

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

    const [dataValue, setDataValue] = useState(initialValue);

    const putNewInputValue = useCallback(debounce((e) => {
        fetch(`http://localhost:3000/notes/${listItemObject.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: e.target.value
            })
        })
    }, 500), []);

    const addNewInputField = useCallback((e) => {
        const newID = uniqid();
        return fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: newID,
                name:"undefined",
                subList: [],
            })
        })
        .then(() => {
            fetch(`http://localhost:3000/notes/${listItemObject.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                subList: [
                    newID,
                    ...listItemObject.subList,
                ]
            })
        })
        })
    },[])

    return (
        <AppContext.Consumer>
            {(context) => (
                <NameInputField
                    type="text"
                    value={dataValue}
                    onChange={(e) => {
                    setDataValue(e.target.value);
                    }}
                    onKeyUp={(e) => {
                        putNewInputValue(e);

                        if(e.key === "Enter" && e.target.value !== "") {
                            addNewInputField(e)
                            .then(() => window.location.reload())

                            // .then(() => {
                            //     context.setCurrentNotes({
                            //         ...context.currentNotes,
                            //         more: ["yes"],
                            //     })
                            // })
                        }
                    }}
                />
            )}
        </AppContext.Consumer>
    )
};

export { NameInput };
