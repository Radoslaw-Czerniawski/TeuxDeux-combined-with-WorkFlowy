
import { useState, useCallback, useEffect } from "react";
import { NameInput } from "../Input/NameInput";
import * as S from "./StylesListItem";
import { AppContext } from "../../ContextApi";
import { ToggleVisibilty } from "../ToggleVisibility/ToggleVisibility";

const ListItem = ({ id, parentList, parentNameList, isFirst }) => {
    const fetchCurrentNestedNoteBasedOnParentsSublistId = useCallback(() => {
        console.log("Fetching")
        return fetch(`http://localhost:3000/notes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setListItemObject({
                    id: `${data.id}`,
                    name: `${data.name}`,
                    subList: [...data.subList]
                });
            })
            .then(() => {
                setOutOfSync(false);
            })
    }, [id]);

    //Sync state with server
    const [outOfSync, setOutOfSync] = useState(true)

    const [listItemObject, setListItemObject] = useState({
        id: "",
        name: "",
        subList: []
    });

    const changeSyncStatus = useCallback(() => {
        setOutOfSync(true);
        console.log("Changed sync status")
    }, [outOfSync])

    useEffect(() => {
        if(outOfSync) {
            fetchCurrentNestedNoteBasedOnParentsSublistId();
        }
    },[changeSyncStatus]);

    //Visibility state for children
    const [childrenVisible, setChildrenVisible] = useState(false);


    const listUrl = [...parentList, id];

    if (parentNameList[parentNameList.length - 1] !== listItemObject.name) {
        parentNameList = [...parentNameList, listItemObject.name];
        parentList = [...parentList, id];
    }

    return (
        <AppContext.Consumer>
            {(context) =>
                listItemObject.id !== "" && (
                    <S.ListElement key={listItemObject.id}>
                        <S.ListElementHeader isFirst={isFirst}>
                            {/* popup menu */}

                            {/* sublist hidden/shown button */}
                            <ToggleVisibilty 
                                childrenVisible={childrenVisible}
                                setChildrenVisible={setChildrenVisible}
                                subList = {listItemObject.subList}
                            ></ToggleVisibilty>

                            {/* dot button */}
                            {!isFirst && (
                                <S.DotButton
                                    /* to={`/${nodeUrl}`} */
                                    key={listItemObject.id}
                                    onClick={() => {
                                        context.setCurrentNotes({
                                            names: parentNameList,
                                            currentPath: listUrl,
                                        });
                                    }}
                                ></S.DotButton>
                            )}

                            {/* Item title = input with onchange attribute  */}
                            <NameInput
                                isFirst={isFirst}
                                listItemObject={listItemObject}
                                parentList={parentList}
                                changeSyncStatus={changeSyncStatus}
                            />
                            {/* <FontAwesomeIcon icon="fa-regular fa-circle-trash" /> */}

                            {/* drag list item handle */}
                        </S.ListElementHeader>
                        {/* sublist */}
                            {childrenVisible && <S.ListContainer>
                                {/* loop generating listItems */}
                                {listItemObject.subList.map((id, index) => (
                                    <>
                                        <ListItem
                                            isFirst={false}
                                            id={id}
                                            key={id}
                                            parentList={parentList}
                                            parentNameList={parentNameList}
                                        />
                                        {!isFirst && (
                                            <S.CoveringLine />
                                        )}
                                    </>
                                ))}

                                {/* + button for adding listItem */}
                            </S.ListContainer>}
                    </S.ListElement>
                )
            }
        </AppContext.Consumer>
    );
};

export { ListItem };
