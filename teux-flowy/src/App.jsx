import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { nestedNotes } from "./data/nestedNotes";
import { List } from "./Components/List/List";
import { AddNote } from "./Components/List/AddNote";

/* [
  1: {name: name, notes: notes, subList:
                                [ 1:{},
                                  2:{}, ...]
                                }
  2: {name: name, notes: notes, subList:
                                [ 1:{},
                                  2:{}, ...]
                                }
] */

function App() {
    const [testStaticNestedNotes, setTestStaticNestedNotes] = useState(nestedNotes);

    console.log(testStaticNestedNotes);

    return (
        <>
            <List nestedNotes={nestedNotes} setTestStaticNestedNotes={setTestStaticNestedNotes}/>
            {/* <Link to="/invoices">Invoices</Link>
            <Link to="/expenses">Expenses</Link>
            <Outlet /> */}
            {/* <AddNote nestedNotes={nestedNotes} setState={setTestStaticNestedNotes} /> */}
        </>
    );
}

export default App;
