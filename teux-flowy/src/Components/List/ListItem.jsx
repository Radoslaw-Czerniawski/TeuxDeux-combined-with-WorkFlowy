import styled from "styled-components";
import { List } from "./List";
import { useState, useCallback, useEffect } from "react";

const ListElement = styled.li`
    font-size: 16px;
    padding: 10px;
    &:hover {
        background: #ddd;
    }
`;

const DotButton = styled.a`
    width:20px;
    height: 20px;
    border-radius: 20px;
    background: red;
`

const ListItem = ({ id }) => {


    const [listItemObject, setListItemObject] = useState({
        "id": "",
        "name": "",
        "subList": [],
    });

    const fetchNotes = useCallback(() => {
        fetch(`http://localhost:3000/notes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setListItemObject({
                    "id": `${data.id}`,
                    "name": `${data.name}`,
                    "subList": [...data.subList]
                });

            });
        }, [id])

    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <ListElement>
            {listItemObject.name} <br/>
            {/* popup menu */}

            {/* sublist hidden/shown button */}
            {/* dot button */}
            {/* Item title = input with onchange attribute  */}
            {/* drag list item handle */}
            {/* sublist */}
            { listItemObject.subList[0] &&
                <List
                    subList={listItemObject.subList}
                />
            }
        </ListElement>
    );
};

export { ListItem };
