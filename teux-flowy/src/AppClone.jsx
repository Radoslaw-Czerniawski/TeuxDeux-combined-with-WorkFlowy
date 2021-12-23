import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListItem } from "./Components/List/ListItem";

function AppClone() {

    let { id } = useParams();
    console.log(id);


    const [givenId, setGivenId] = useState(id);

    useEffect(() => {
        setGivenId(id);
    }, [id])

    return (
        <ul>
            {(givenId === id) && <ListItem id={givenId} />}
        </ul>
    );
}

// localhost:3001/id1/id2/id3/id4
// route path=id1/id2/:params


// localhost:3001/?path=id1:id2:id3:id4
// ==> array
// array[length-1]

export { AppClone };
