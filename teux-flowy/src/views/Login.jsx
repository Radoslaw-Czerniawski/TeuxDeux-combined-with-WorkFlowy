import styled from "styled-components";
import { PALLETE } from "../Colors/colors";
import logo from "../assets/kisspng-google-logo-google-search-google-now-5b1dacc1d7db69.8759511015286714258842.png";

const Login = () => {
    return (
        <StyledLoginWrapper>
            <StyledGoogleSignInButton>
                <StyledGoogleLogoWrapper>
                    <StyledGoogleLogo src={logo} />
                </StyledGoogleLogoWrapper>

                <StyledGoogleText> Sign in with Google</StyledGoogleText>
            </StyledGoogleSignInButton>
            <StyledLoginForm></StyledLoginForm>
        </StyledLoginWrapper>
    );
};

export { Login };

const StyledLoginWrapper = styled.div`
    display: flex;
    margin: 20rem auto 0;
    height: 50vh;
    width: 100%;
    max-width: 45rem;
    justify-content: center;
    border-radius: 1rem;
    box-shadow: 0 3px 10px 1px ${PALLETE.greyOpacity};
`;

const StyledGoogleSignInButton = styled.button`
    display: flex;
    align-items: center;
    height: 5rem;
    justify-content: space-between;
    margin-top: 5rem;
    padding: 0;
    background-color: white;
    color: grey;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    box-shadow:  0 1px 2px 0 ${PALLETE.greyOpacity};
    overflow: hidden;
    transition: background-color 100ms;

    &:hover {
        background-color: #4f86ec;
        color: white;
        &:active {
            transform: scale(.99);
            transition: transform 50ms;
        }
    }
`;

const StyledGoogleLogoWrapper = styled.div`
    height: 100%;
    box-sizing: border-box;
    padding: .2rem 1rem .2rem .2rem;
    overflow: hidden;
`;

const StyledGoogleLogo = styled.img`
    height: 100%;
    width:  100%;
    background: #fff;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    border-radius: .3rem;
`;

const StyledGoogleText = styled.div`
    padding: 1rem;
`;

const StyledLogoWrapper = styled.div``;

const StyledLoginForm = styled.form``;
