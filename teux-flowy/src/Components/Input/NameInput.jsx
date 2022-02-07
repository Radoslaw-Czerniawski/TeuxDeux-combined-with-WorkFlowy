import { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import debounce from "lodash/debounce";

// Firebase
import { getDatabase, ref, onValue, set, push, update } from "firebase/database";
import { db as fireData } from "../../DB/DB";
import { updateFirebaseProperty } from "../List/ListItem";

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
    createNewNote,
}) => {
    const [dataValue, setDataValue] = useState(listItemObject.name);

    const putNewInputValue = debounce((e) => {
        updateFirebaseProperty(listItemObject.id, "name", e.target.textContent);
        let range = new Range();

        range.setStart(e.target.childNodes[0], e.target.textContent.length);
        range.collapse(true);

        const sel = window.getSelection();

        sel.removeAllRanges();
        sel.addRange(range);
    }, 250);

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
                if(e.key !== "Backspace" && e.target.textContent !== "" ) putNewInputValue(e);


                if (e.key === "Enter" && e.target.textContent !== "") {
                    e.preventDefault();
                    createNewNote();
                }

                if (e.key === "Backspace" && e.target.textContent === "" && !isFirst) {
                    removeCurrentInput();
                }
            }}
        >
            {listItemObject.name}
        </StyledNameInputField>
    );
};

export { NameInput };
