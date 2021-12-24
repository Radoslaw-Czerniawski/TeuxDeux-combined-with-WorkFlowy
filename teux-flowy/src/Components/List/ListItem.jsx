import styled from "styled-components";
import { List } from "./List";
import { useState, useCallback, useEffect } from "react";
import { NameInput } from "../Input/NameInput";
import { Link } from "react-router-dom";

const ListElement = styled.li`
    /* display: flex;
    align-items: left; */
    font-size: 16px;
    padding: 10px;
`;

const DotButton = styled.div`
    display: block;
    margin: 0 10px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: grey;
    transition: opacity 0.4s;
    &:hover {
        opacity: 0.5;
    }
`;

const ListElementHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    transition: background-color 0.3s linear;
    &:hover {
        background: #ddf;
    }
`;

const WeirdLineFromDotToDot = styled.div`
    position: absolute;
    left: 24px;
    top: 3rem;
    width: 2px;
    height: 100%;
    background: #eee;
`;

const ListItem = ({ id, parentList }) => {
    const fetchCurrentNestedNoteBasedOnParentsSublistId = useCallback(() => {
        return fetch(`http://localhost:3000/notes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setListItemObject({
                    id: `${data.id}`,
                    name: `${data.name}`,
                    subList: [...data.subList],
                });
            });
    }, [id]);

    const [listItemObject, setListItemObject] = useState({
        id: "",
        name: "",
        subList: [],
    });

    useEffect(() => {
        fetchCurrentNestedNoteBasedOnParentsSublistId();
    }, []);

    // parentList to URL -> localhost:3001/
    const nodeUrl = [...parentList, ...[id]].join(":");

    return (
        <>
            {listItemObject.id !== "" && (
                <ListElement key={listItemObject.id}>
                    <ListElementHeader>
                        {/* popup menu */}
                        {/* sublist hidden/shown button */}
                        {/* dot button */}
                        <Link to={`/${nodeUrl}`} key={listItemObject.id}>
                            <DotButton key={listItemObject.id} />
                        </Link>
                        <WeirdLineFromDotToDot />

                        {/* Item title = input with onchange attribute  */}
                        <NameInput listItemObject={listItemObject} />

                        {/* drag list item handle */}
                    </ListElementHeader>
                    {/* sublist */}
                    {listItemObject.subList[0] && (
                        <List
                            subList={listItemObject.subList}
                            parentList={[...parentList, ...[id]]}
                        />
                    )}
                </ListElement>
            )}
        </>
    );
};

export { ListItem };

/*



    const putNewInputValue = () => {
        return fetch(`http://localhost:3000/notes/${listItemObject.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: dataValue
            })
        })
    }

    const [dataValue, setDataValue] = useState(listItemObject.name)

    return <NameInputField type="text" onChange={(e) => setDataValue(e.target.value)} value={dataValue} />;






*/
