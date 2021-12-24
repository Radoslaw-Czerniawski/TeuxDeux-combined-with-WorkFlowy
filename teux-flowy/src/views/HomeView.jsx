import { ListItem } from "../Components/List/ListItem";
import { useEffect } from "react";


const HomeView= ({ setCurrentPath }) => {

    return (
        <ul>
            <ListItem id={"HOME"} parentList={[]} />
        </ul>
    );
}

export { HomeView };
