import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DynamicView } from "./views/DynamicView";
import "./App.css";
import { useEffect, useState } from "react";
import { Header } from "./Components/Header/Header";
import { AppContext } from "./ContextApi";
import { CalendarView } from "./views/CalendarView";
import { Footer } from "./Components/Footer/Footer";
import styled from "styled-components";
import { Authentication } from "./Components/Authentication/Authentication";
import { Login } from "./views/Login";

// Firebase

function App() {
    const [currentNotes, setCurrentNotes] = useState({
        names: [],
        currentPath: [],
    });

    const [cssAnimationState, setCssAnimationState] = useState(true);

    const [userInfo, setUserInfo] = useState({
        isLogged: false,
        notesAccess: [],
        currentHomeId: "",
    });

    if (currentNotes.currentPath.length === 1) {
        setCurrentNotes({
            names: [],
            currentPath: [],
        });
    }

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
                    userInfo={userInfo}
                    idPath={currentNotes}
                    setGlobalState={setCurrentNotes}
                    cssAnimationState={cssAnimationState}
                    setCssAnimationState={setCssAnimationState}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Authentication isLogged={userInfo.isLogged}>
                                <DynamicView
                                    currentHomeId={userInfo.currentHomeId}
                                    setCssAnimationState={setCssAnimationState}
                                    cssAnimationState={cssAnimationState}
                                    setCurrentPath={setCurrentNotes}
                                    currentNotes={currentNotes}
                                />
                            </Authentication>
                        }
                    />
                    <Route path="calendar" element={<CalendarView />} />
                    <Route path="login" element={<Login />} />
                </Routes>
                <Footer />
            </AppContext.Provider>
        </BrowserRouter>
    );
}
export default App;

const ViewsContainer = styled.div`
    width: 100%;
`;
