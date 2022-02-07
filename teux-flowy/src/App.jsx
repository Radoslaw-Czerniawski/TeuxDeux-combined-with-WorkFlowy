import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DynamicView } from "./views/DynamicView";
import "./App.css";
import { useEffect, useState } from "react";
import { Header } from "./Components/Header/Header";
import { AppContext } from "./ContextApi";
import { CalendarView } from "./views/CalendarView";
import { Footer } from "./Components/Footer/Footer";
import styled from "styled-components";

// Firebase


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

    const ViewsContainer = styled.div`
        width: 100%;
    `;

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
                <Footer />
            </AppContext.Provider>
        </BrowserRouter>
    );
}
export default App;
