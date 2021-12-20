import styled from "styled-components";
import uniqid from "uniqid"

const AddNoteButton = styled.button`
border: 1px solid black;
padding: 10px;
`;

const AddNote = ({nestedNotes, note, setState}) => {

    const addNewNestedNote = (nestedNote, note) => {
        if(!note) {
            setState(
                nestedNotes.push({
                    id: `${uniqid.process()}`,
                    name: `zupa 1`,
                    subList: [],
                })
            );
        } else {
            setState(
                note.subList.push({
                    id: `${uniqid.process()}`,
                    name: `zupa${note.subList.length + 1}`,
                    subList: [],
                })
            );
        }
    };

    return (
        <AddNoteButton onClick={() => addNewNestedNote(note)}>
            +
        </AddNoteButton>
     );
}

export { AddNote };
