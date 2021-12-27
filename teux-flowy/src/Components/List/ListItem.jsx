import styled from "styled-components";
import { List } from "./List";
import { useState, useCallback, useEffect } from "react";
import { NameInput } from "../Input/NameInput";
import { Link } from "react-router-dom";
import * as S from "./StylesListItem"
import App from "../../App";
import { AppContext } from "../../ContextApi";


// const WeirdLine = styled.div`
//     display: block;
//     position: absolute;
//     left: 5.4rem;
//     top: 3rem;
//     width: 2px;
//     height: 100%;
//     background: #eee;
//     z-index: -1;
// `



const ListItem = ({ id, parentList, parentNameList, isFirst }) => {


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
    const listUrl = [...parentList, ...[id]];

    if(parentNameList[parentNameList.length - 1] !== listItemObject.name) {
        parentNameList = [...parentNameList, listItemObject.name];
        parentList = [...parentList, id]
    }

    console.log(listItemObject.name, ":", parentList)

    return (
        <AppContext.Consumer>
            {(context) => (
                    listItemObject.id !== "" && (
                        <S.ListElement
                            key={listItemObject.id}
                        >
                            <S.ListElementHeader isFirst={isFirst}>
                                {/* popup menu */}
                                {/* sublist hidden/shown button */}
                                {/* dot button */}
                                {!isFirst && (
                                    <S.DotButton
                                        /* to={`/${nodeUrl}`} */
                                        key={listItemObject.id}
                                        onClick={() => {
                                            context.setCurrentNotes({
                                                names: parentNameList,
                                                currentPath: listUrl,
                                            })

                                        }}
                                    >
                                    </S.DotButton>
                                )}


                                {/* Item title = input with onchange attribute  */}
                                <NameInput
                                    listItemObject={listItemObject}
                                    parentList={parentList}
                                />
                                {/* <FontAwesomeIcon icon="fa-regular fa-circle-trash" /> */}

                                {/* drag list item handle */}
                            </S.ListElementHeader>
                            {/* sublist */}
                            {listItemObject.subList[0] && (
                                <>
                                    <List
                                        isFirst={isFirst}
                                        subList={listItemObject.subList}
                                        parentList={parentList}
                                        parentNameList={parentNameList}
                                    />
                                </>
                            )}
                        </S.ListElement>

                    )
            )}
        </AppContext.Consumer>
    );
};

export { ListItem };


