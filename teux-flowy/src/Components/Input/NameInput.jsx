import { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import debounce from "lodash/debounce";

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

const StyledNameInputField = styled.span`
    background: transparent;
    margin: 0;
    padding: 0;
    flex-grow: 1;
    font-weight: ${({ isFirst }) => (isFirst ? "bold" : "regular")};
    font-size: ${({ isFirst }) => (isFirst ? "1.9rem" : "1.6rem")};
    border: none;
    display: block;
    overflow: visible;
    color: ${(props) => (props.isMarkedAsDone ? "#ddd" : "inherit")};
    text-decoration: ${(props) => (props.isMarkedAsDone ? "line-through" : "none")};
    &:active,
    &:focus {
        border: none;
        outline: none;
        animation: ${activeTextPulse} 1.6s infinite;
    }
`;

const NameInput = ({
    listItemObject,
    addChildInputField,
    removeCurrentInput,
    isFirst,
    isMarkedAsDone,
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

    return (
        <StyledNameInputField
            isMarkedAsDone={isMarkedAsDone}
            type="text"
            contentEditable={true}
            suppressContentEditableWarning={true}
            isFirst={isFirst}
            spellCheck="false"
            onBlur={(e) => {
                setDataValue(e.target.textContent);
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }}
            onKeyUp={(e) => {
                putNewInputValue(e);

                if (e.key === "Enter" && e.target.textContent !== "") {
                    e.preventDefault();
                    addChildInputField();
                }

                if (e.key === "Backspace" && e.target.textContent === "" && !isFirst) {
                    removeCurrentInput();
                }
            }}
        >
            {dataValue}
        </StyledNameInputField>
    );
};

export { NameInput };
