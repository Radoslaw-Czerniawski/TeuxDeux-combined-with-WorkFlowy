import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import "./App.css";
import { ListItem } from "./Components/List/ListItem";

function App() {

    return (
        <ul>
            <ListItem id={"HOME"} />
        </ul>
    );
}

// localhost:3001/id1/id2/id3/id4
// route path=id1/id2/:params


// localhost:3001/?path=id1:id2:id3:id4
// ==> array
// array[length-1]

export default App;
