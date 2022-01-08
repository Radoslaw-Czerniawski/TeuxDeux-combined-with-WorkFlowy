import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DynamicView } from "./views/DynamicView";
import "./App.css";
import { useEffect, useState } from "react";
import { Header } from "./Components/Header/Header";
import { AppContext } from "./ContextApi";
import {CalendarView} from "./views/CalendarView";
import { Footer } from "./Components/Footer/Footer";
import styled from "styled-components";

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

    const AppContainer = styled.div`
        display: grid;
        min-height: 100vh;
        overflow: hidden;
        grid-template-rows: auto 1fr auto;
    `

    return (
        <BrowserRouter>
            <AppContext.Provider value={ContextElement}>
                <AppContainer>
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
                    <Footer>

                    </Footer>
                </AppContainer>
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
