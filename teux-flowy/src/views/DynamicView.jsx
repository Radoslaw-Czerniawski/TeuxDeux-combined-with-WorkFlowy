import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListItem } from "../Components/List/ListItem";
import styled from "styled-components";

function DynamicView({ setCurrentPath, currentNotes }) {
    // let { idPath } = useParams();

    // const [givenIdPath, setGivenIdPath] = useState(idPath);

  /*   useEffect(() => {
        setGivenIdPath(idPath);
        setCurrentPath({
            names: [...globalState.names],
            currentPath: idPath.split(":"),
        });
        return;
    }, [idPath]); */

    const StyledMainList = styled.ul`
        max-width:700px;
        margin: 5rem auto;
    `

    const id = currentNotes.currentPath[currentNotes.currentPath.length - 1] || "HOME";
    const parentList = currentNotes.currentPath;

    console.log(currentNotes.currentPath)

    return (
        <StyledMainList>
            {(
                <ListItem
                    id={id}
                    isFirst={true}
                    parentSublist={null}
                    parentNameList={currentNotes.names}
                    parentList={parentList}
                    parentChangeSyncStatus={undefined}
                    key={id}
                />
            )}
        </StyledMainList>
    );
}

export { DynamicView };
