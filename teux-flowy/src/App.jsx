import "./App.css";
import { Link, Outlet, useParams} from "react-router-dom";
import { useState } from "react";
import { ListItem } from "./Components/List/ListItem";

function App() {

	const { id } = useParams();

	console.log(id);

    return (
        <ul>
            <ListItem id={id} />
        </ul>
    );
}

export default App;
