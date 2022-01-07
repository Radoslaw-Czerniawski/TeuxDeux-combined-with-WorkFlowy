import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DynamicView } from "./views/DynamicView";
import "./App.css";
import { useEffect, useState } from "react";
import { Header } from "./Components/Header/Header";
import { AppContext } from "./ContextApi";
import {CalendarView} from "./views/CalendarView";

function App() {
    const [currentNotes, setCurrentNotes] = useState({
        names: [],
        currentPath: [],
    });

    if (currentNotes.currentPath.length === 1) {
        setCurrentNotes({
            names: [],
            currentPath: [],
        });
    }

    const [cssAnimationState, setCssAnimationState] = useState(true);

    useEffect(() => {
        setCssAnimationState(true);
    }, [currentNotes.currentPath]);

    const ContextElement = {
        ...currentNotes,
        setCurrentNotes,
    };

    return (
        <BrowserRouter>
            <AppContext.Provider value={ContextElement}>
                <Header
                    idPath={currentNotes}
                    setGlobalState={setCurrentNotes}
                    cssAnimationState={cssAnimationState}
                    setCssAnimationState={setCssAnimationState}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <DynamicView
                                setCssAnimationState={setCssAnimationState}
                                cssAnimationState={cssAnimationState}
                                setCurrentPath={setCurrentNotes}
                                currentNotes={currentNotes}
                            />
                        }
                    />
                    <Route path="calendar" element={<CalendarView />} />
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
