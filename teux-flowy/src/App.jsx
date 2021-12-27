import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeView } from "./views/HomeView";
import { DynamicView } from "./views/DynamicView";
import "./App.css";
import { useState } from "react";
import { Header } from "./Components/Header/Header";
import { AppContext } from "./ContextApi";

function App() {
    const [currentNotes, setCurrentNotes] = useState({
        names: [],
        currentPath: []
    });

    if (currentNotes.currentPath.length === 1) {
        setCurrentNotes({
            names: [],
            currentPath: [],
        });
    }

    const ContextElement = {
        ...currentNotes,
        setCurrentNotes
    }

    return (
        <BrowserRouter>
            <AppContext.Provider value={ContextElement}>
                <Header idPath={currentNotes} setGlobalState={setCurrentNotes} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <DynamicView
                                setCurrentPath={setCurrentNotes}
                                currentNotes={currentNotes}
                            />
                        }
                    />

                    <Route
                        path="/:idPath"
                        element={
                            <DynamicView
                                setCurrentPath={setCurrentNotes}
                                currentNotes={currentNotes} />
                        }
                    />
                </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    );
}

// localhost:3001/id1/id2/id3/id4
// route path=id1/id2/:params

// localhost:3001/?path=id1:id2:id3:id4
// ==> array
// array[length-1]

export default App;
