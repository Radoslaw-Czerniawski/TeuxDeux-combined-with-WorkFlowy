import styled from "styled-components";
import uniqid from "uniqid";
import { AddNote } from "./AddNote";


const ListElement = styled.li`
    border: 1px solid black;
    padding: 10px;
`;

const DeleteItem = styled.button``;

const List = ({ nestedNotes, setTestStaticNestedNotes }) => {
    const addNewNestedNote = (note) => {
        if(!note) {
            setTestStaticNestedNotes(
                nestedNotes.push({
                    id: `${uniqid.process()}`,
                    name: `zupa 1`,
                    subList: [],
                })
            );
        } else {
            setTestStaticNestedNotes(
                note.subList.push({
                    id: `${uniqid.process()}`,
                    name: `zupa${note.subList.length + 1}`,
                    subList: [],
                })
            );
        }
    };

    const removeNewNestedNote = (note) => {
        const itemToRemoveIndex = nestedNotes.findIndex((item) => {
            return item.id === note.id;
        });

        if (itemToRemoveIndex !== -1) {
            setTestStaticNestedNotes(nestedNotes.splice(itemToRemoveIndex, 1));
        };
    };

    return (
        <ul>
            {nestedNotes.map((note) => {
                return (
                    <ListElement id={note.id}>
                        {note.id}
                        <br />
                        {note.name}
                        <br />
                        <button onClick={() => removeNewNestedNote(note)}>Remove Note</button>
                        <AddNote  nestedNotes={nestedNotes} note={note} setState={setTestStaticNestedNotes}/>
                        <List
                            nestedNotes={note.subList}
                            setTestStaticNestedNotes={setTestStaticNestedNotes}
                        />
                    </ListElement>
                );
            })}
        </ul>
    );
};

export { List };
