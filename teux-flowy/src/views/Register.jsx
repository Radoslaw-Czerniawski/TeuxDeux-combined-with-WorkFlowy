// Styled Components
import * as S from "./StylesLogin";
// React States
import { useRef, useState } from "react";

//Logos
import logo from "../assets/kisspng-google-logo-google-search-google-now-5b1dacc1d7db69.8759511015286714258842.png";
import logo2 from "../assets/pngegg.png";
import logo3 from "../assets/key-outline.png";

// Firebase Authentication functions
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
} from "firebase/auth";

// Firebase Database
import { db as fireData } from "../DB/DB";

// Firebase Database methods
import { get, child, ref } from "firebase/database";

// React Router Navigation
import { Navigate, useNavigate } from "react-router-dom";
import { set } from "lodash";

const Register = ({ setUserInfo, userInfo }) => {
    const [errorMessage, setErrorMessage] = useState(null)

    const form = useRef();
    const navigation = useNavigate();
    const auth = getAuth();

    const register = async (e) => {
        e.preventDefault();

        const email = form.current.email.value;
        const password = form.current.password.value;

        try {
            const res1 = await createUserWithEmailAndPassword(auth, email, password)

            const response = await signInWithEmailAndPassword(auth, email, password);
            const { user: userData } = response;
            const response2 = await get(child(ref(fireData), `users/${userData.uid}`));
            const userNotes = response2.val() || [];

            setUserInfo((oldState) => ({
                ...oldState,
                isLogged: true,
                currentHomeId: Object.keys(userNotes)[0],
                userUID: userData.uid,
                displayName: userData.email,
            }));

            window.localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    isLogged: true,
                    currentHomeId: Object.keys(userNotes)[0],
                    userUID: userData.uid,
                    displayName: userData.email,
                })
            );

            navigation("/");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setErrorMessage(errorMessage)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    };

    return (
        <S.ViewWrapper>
            {userInfo.isLogged && <Navigate to="/" />}
            <S.LoginWrapper>
                <S.LoginForm ref={form} onSubmit={register}>
                    <S.FormHeading>Register With E-mail</S.FormHeading>

                    <S.InputWrapper>
                        <S.Input name="email" type="email" required placeholder="E-mail" />
                        <S.EmailLogo src={logo2}></S.EmailLogo>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <S.Input name="password" type="password" required placeholder="Password" />
                        <S.KeyLogo src={logo3}></S.KeyLogo>
                    </S.InputWrapper>
                    <S.SubmitButton type="submit">Register</S.SubmitButton>
                    {errorMessage && (<S.ErrorMessage>{errorMessage}</S.ErrorMessage>)}
                </S.LoginForm>

            </S.LoginWrapper>
        </S.ViewWrapper>
    );
};

export { Register };

