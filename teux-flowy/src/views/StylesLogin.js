import styled from "styled-components";
import { PALLETE } from "../Colors/colors";

export const ViewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 45rem;
    border-radius: 1.5rem;
    box-shadow: inset 0 1px 2px 0 rgb(128 128 128 / 70%);
    background-color: #bdcdee;
`;

export const GoogleSignInButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4rem 2rem;
`;

export const GoogleSignInButton = styled.button`
    user-select: none;
    display: flex;
    align-items: center;
    height: 5rem;
    padding: 0;
    background-color: white;
    color: grey;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 2px 0 ${PALLETE.greyOpacity};
    overflow: hidden;
    transition: background-color 100ms;

    &:hover {
        background-color: #4f86ec;
        color: white;
        &:active {
            transform: scale(0.97);
            transition: transform 50ms;
        }
    }
`;

export const GoogleLogoWrapper = styled.div`
    height: 5rem;
    box-sizing: border-box;
    padding: 0.2rem 0.2rem 0.2rem 0.2rem;
    overflow: hidden;
`;

export const GoogleLogo = styled.img`
    height: 100%;
    width: 100%;
    background: #fff;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    border-radius: 0.3rem;
`;

export const GoogleText = styled.div`
    padding: 1rem;
`;

export const LoginForm = styled.form`
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding: 4rem 2rem;
    background-color: #194c94;
    align-items: center;
`;

export const FormHeading = styled.h2`
    user-select: none;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${PALLETE.white};
    font-weight: 500;
`;

export const Input = styled.input`
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: 1.4rem;
    width: clamp(28rem, 60vw, 35rem);
    box-shadow: inset 0 1px 2px 0 rgb(128 128 128 / 60%);

    &::placeholder {
        user-select: none;
    }

    &:focus {
        outline: 0.3rem solid ${PALLETE.primary};
    }
`;

export const InputWrapper = styled.div`
    position: relative;
`;

export const EmailLogo = styled.img`
    user-select: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    bottom: 0;
    right: 1rem;
    width: 2.5rem;
    filter: invert(50%) sepia(1%) saturate(3203%) hue-rotate(202deg) brightness(91%) contrast(84%);
`;

export const KeyLogo = styled(EmailLogo)`
    weight: 500;
    transform: translateY(-50%) rotate(90deg);
    width: 2.5rem;
    right: 1rem;
`;

export const SubmitButton = styled.button`
    border: none;
    box-shadow: inset 0 1px 1px -3px rgb(0 0 0 / 100%);
    cursor: pointer;
    font-size: 1.4rem;
    padding: 2rem 4rem;
    border-radius: 3rem;
    background: ${PALLETE.confirm};
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    transition: transform 0.3s, opacity 0.3s;
    user-select: none;
    &:hover {
        opacity: 0.85;
        &:active {
            transform: scale(0.98);
            transition: transform 50ms;
        }
    }
`;
