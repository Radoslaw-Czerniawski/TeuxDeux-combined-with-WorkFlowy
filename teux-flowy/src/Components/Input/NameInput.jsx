import { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import debounce from "lodash/debounce";
import uniqid from "uniqid";

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
`;

const NameInputField = styled.span`
    background: transparent;
    margin: 0;
    padding: 0;
    flex-grow: 1;
    font-weight: ${({ isFirst }) => (isFirst ? "bold" : "regular")};
    font-size: ${({ isFirst }) => (isFirst ? "1.9rem" : "1.6rem")};
    border: none;
    display: block;
    overflow: visible;
    &:active,
    &:focus {
        border: none;
        outline: none;
        animation: ${activeTextPulse} 1.6s infinite;
    }
`;

const NameInput = ({
    listItemObject,
    removeCurrentInput,
    isFirst,
    changeSyncStatus
}) => {
    const [dataValue, setDataValue] = useState(listItemObject.name);

    const putNewInputValue = useCallback(
        debounce((e) => {
            fetch(`http://localhost:3000/notes/${listItemObject.id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name: e.target.textContent,
                }),
            });
        }, 200),
        []
    );

    const addNewInputField = (e) => {
        const newID = uniqid();
        fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: newID,
                name: "Pisz tutaj ...",
                subList: [],
            }),
        })
            .then(() => {
                fetch(`http://localhost:3000/notes/${listItemObject.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        subList: [newID, ...listItemObject.subList],
                    }),
                });
            })
            .then(() => changeSyncStatus());
    };

    return (
        <NameInputField
            type="text"
            contentEditable={true}
            isFirst={isFirst}
            onBlur={(e) => {
                setDataValue(e.target.textContent);
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }

                if (e.key === "Enter" && e.target.textContent !== "") {
                    addNewInputField(e);
                }
            }}
            onKeyUp={(e) => {
                putNewInputValue(e);

                if (e.key === "Backspace" && e.target.textContent === "" && !isFirst) {
                    removeCurrentInput();
                }
            }}
        >
            {dataValue}
        </NameInputField>
    );
};

export { NameInput };
