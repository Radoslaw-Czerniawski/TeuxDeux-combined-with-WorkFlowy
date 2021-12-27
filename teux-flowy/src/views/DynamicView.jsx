import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListItem } from "../Components/List/ListItem";

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

    const id = currentNotes.currentPath[currentNotes.currentPath.length - 1] || "HOME";
    const parentList = currentNotes.currentPath;


    return (
        <ul>
            {(
                <ListItem
                    id={id}
                    isFirst={true}
                    parentNameList={currentNotes.names}
                    parentList={parentList}
                    key={id}
                />
            )}
        </ul>
    );
}

export { DynamicView };
