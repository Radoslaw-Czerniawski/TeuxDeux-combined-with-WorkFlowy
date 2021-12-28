import { useCallback, useContext, useEffect, useState } from "react";
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
    margin: 0;
    padding: 0;
    flex-grow: 1;
    font-weight: ${({isFirst}) => isFirst ? "bold" : "regular"};
    font-size: ${({isFirst}) => isFirst ? "1.9rem" : "1.6rem"};
    border: none;
    display: block;
    overflow: visible;
    &:active, &:focus {
        border: none;
        outline: none;
        animation: ${activeTextPulse} 1.6s infinite;
    }
`;

const NameInput = ({ listItemObject, /* parentList */ removeCurrentInput, isFirst, changeSyncStatus, parentSublist }) => {

    console.log("SUBLISTA KURDE", listItemObject.subList)


    const [dataValue, setDataValue] = useState(listItemObject.name);

    // let filteredParentSublist = (parentSublist) && parentSublist.filter((value) => {
    //     if(value !== listItemObject.id) {
    //         return value;
    //     }
    // })

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
        console.log(newID);
        return fetch(`http://localhost:3000/notes`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: newID,
                name:"Pisz tutaj ...",
                subList: [],
            })
        })
        .then(() => {
            console.log(listItemObject.subList);
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
            });
            console.log("Patch ended ====");
        })
    },[listItemObject])

    // const removeCurrentInput = useCallback((e) => {
    //     fetch(`http://localhost:3000/notes/${parentList[parentList.length - 2]}`, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         subList: [
    //             ...filteredParentSublist,
    //         ]
    //     })})
    //     .then(() => {
    //         fetch(`http://localhost:3000/notes/${listItemObject.id}`, {
    //         method: "DELETE",
    //         })
    //     })
    // }, [])



    return (
        <NameInputField
            type="text"
            isFirst={isFirst}
            value={dataValue}
            onChange={(e) => {
            setDataValue(e.target.value);
            }}
            onKeyUp={(e) => {
                putNewInputValue(e);

                if(e.key === "Enter" && e.target.value !== "") {
                    addNewInputField(e)
                    .then(() => changeSyncStatus())
                }

                if(e.key === "Backspace" && e.target.value === "") {
                    removeCurrentInput(e)
                }
            }}
        />
    )
};

export { NameInput };
