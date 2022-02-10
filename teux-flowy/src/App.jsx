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
import { AppendUserToList } from "./views/AppendUserToList";
import { Register } from "./views/Register";

function App() {
    const [currentNotes, setCurrentNotes] = useState({
        names: [],
        currentPath: [],
    });

    const [cssAnimationState, setCssAnimationState] = useState(true);

    const [userInfo, setUserInfo] = useState(() => {
        const localState = window.localStorage.getItem("userInfo");

        if (localState === null) {
            return {
                isLogged: false,
                currentHomeId: "",
                userUID: "",
                displayName: "",
            };
        }

        return JSON.parse(localState);
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
                    setUserInfo={setUserInfo}
                    setCssAnimationState={setCssAnimationState}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Authentication isLogged={userInfo.isLogged}>
                                <DynamicView
                                    userInfo={userInfo}
                                    setUserInfo={setUserInfo}
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
                    <Route
                        path="login"
                        element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />}
                    />
                    <Route
                        path="register"
                        element={<Register userInfo={userInfo} setUserInfo={setUserInfo} />}
                    />
                    <Route
                        path="append/:data"
                        element={<AppendUserToList
                        userInfo={userInfo}
                        setUserInfo={setUserInfo} />}

                    />
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
