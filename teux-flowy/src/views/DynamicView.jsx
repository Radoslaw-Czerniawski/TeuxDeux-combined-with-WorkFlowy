import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListItem } from "../Components/List/ListItem";

function DynamicView({ setCurrentPath, globalState }) {
    let { idPath } = useParams();

    const [givenIdPath, setGivenIdPath] = useState(idPath);

    useEffect(() => {
        setGivenIdPath(idPath);
        setCurrentPath({
            names: [],
            currentPath: idPath.split(":"),
        });
    }, [idPath]);

    const parentList = idPath.split(":");
    const id = parentList.pop();

    return (
        <ul>
            {givenIdPath === idPath && (
                <ListItem
                    id={id}
                    parentList={parentList}
                    key={id}
                />
            )}
        </ul>
    );
}

export { DynamicView };
