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

const Login = ({ setUserInfo, userInfo }) => {
    const form = useRef();
    const navigation = useNavigate();

    const emailAndPasswordSignInHandler = async (e) => {
        e.preventDefault();

        const email = form.current.email.value;
        const password = form.current.password.value;

        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response);
            const { user: userData} = response;
            const response2 = await get(child(ref(fireData), `users/${userData.uid}`));
            const userNotes = response2.val() || [];

            setUserInfo((oldState) => ({
                ...oldState,
                isLogged: true,
                currentHomeId: Object.keys(userNotes)[0],
                userUID: userData.uid,
                displayName: userData.email
            }));

            window.localStorage.setItem("userInfo", JSON.stringify({
                isLogged: true,
                currentHomeId: Object.keys(userNotes)[0],
                userUID: userData.uid,
                displayName: userData.email
            }));

            navigation("/");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        }
    };

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const googleSignInHandler = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const userData = response.user;
            const response2 = await get(child(ref(fireData), `users/${userData.uid}`));
            const userNotes = response2.val() || [];



            setUserInfo((oldState) => ({
                ...oldState,
                isLogged: true,
                currentHomeId: Object.keys(userNotes)[0],
                userUID: userData.uid,
                displayName: userData.email
            }));



            window.localStorage.setItem("userInfo", JSON.stringify({
                isLogged: true,
                currentHomeId: Object.keys(userNotes)[0],
                userUID: userData.uid,
                displayName: userData.email
            }));

            navigation("/");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        }

        // signInWithPopup(auth, provider)
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const credential = GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential.accessToken;
        //         const user = result.user;
        //         return user
        //     })
        //     .then(() => {

        //     })
        //     .then((user) => setUserInfo((oldState) => ({
        //         ...oldState,
        //         userUID: user.uid,
        //         isLogged: true,
        //     })))
        //     .then(() => navigation("/"))
        // .catch((error) => {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     const email = error.email;
        //     // The AuthCredential type that was used.
        //     const credential = GoogleAuthProvider.credentialFromError(error);
        //     // ...
        // });
    };

    return (
        <S.ViewWrapper>
            {userInfo.isLogged && <Navigate to="/"/>}
            <S.LoginWrapper>
                <S.GoogleSignInButtonWrapper>
                    <S.GoogleSignInButton onClick={googleSignInHandler}>
                        <S.GoogleLogoWrapper>
                            <S.GoogleLogo src={logo} />
                        </S.GoogleLogoWrapper>

                        <S.GoogleText> Sign in with Google</S.GoogleText>
                    </S.GoogleSignInButton>
                </S.GoogleSignInButtonWrapper>

                <S.LoginForm ref={form} onSubmit={emailAndPasswordSignInHandler}>
                    <S.FormHeading>Sign in With E-mail</S.FormHeading>

                    <S.InputWrapper>
                        <S.Input name="email" type="email" required placeholder="E-mail" />
                        <S.EmailLogo src={logo2}></S.EmailLogo>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <S.Input name="password" type="password" required placeholder="Password" />
                        <S.KeyLogo src={logo3}></S.KeyLogo>
                    </S.InputWrapper>

                    <S.SubmitButton>Submit</S.SubmitButton>
                </S.LoginForm>
            </S.LoginWrapper>
        </S.ViewWrapper>
    );
};

export { Login };
