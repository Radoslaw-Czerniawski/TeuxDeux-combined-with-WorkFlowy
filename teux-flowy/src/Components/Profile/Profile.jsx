import styled from "styled-components"
import { faUserCircle } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PALLETE } from "../../Colors/colors";
import { Link } from "react-router-dom";

export const Profile = ({userInfo}) => {
    return (
        <ProfileContainer>
            <ProfileIcon>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </ProfileIcon>
            <ProfileDropdown>
                {userInfo.isLogged && <>
                <ProfileHeader>
                    Profile
                </ProfileHeader>
                <ProfileElement>
                    Imie & nazwisko
                </ProfileElement>
                <ProfileElement>
                    <LoginButton to="/">
                        Log out
                    </LoginButton>
                </ProfileElement>
                </>}

                {!userInfo.isLogged && <>
                    <ProfileHeader>
                        Not logged in
                    </ProfileHeader>
                    <ProfileElement>
                        <LoginButton to="/login">
                            Log in
                        </LoginButton>
                    </ProfileElement>
                </>}
            </ProfileDropdown>
        </ProfileContainer>
    );
}

const ProfileDropdown = styled.div`
    display: none;
    opacity: 0;
    position: absolute;
    top: calc(100% + 2rem);
    right: 0;
    border-radius: 0.5rem;
    overflow: hidden;
    max-width: 50vw;
    transition: opacity 0.3s;
    min-width: 25rem;
    box-shadow: 0 1px 6px 0 rgb(128 128 128 / 80%);
    transition: opacity 1s;
    background: #fff;
    z-index:5;

    &:hover {
            display: block;
            opacity: 1;
        }
`

const ProfileContainer = styled.div`
    color: ${PALLETE.secondary};
    position: relative;
`

const ProfileIcon = styled.div`
    &:hover::before{
        content: "";
        position: absolute;
        bottom: -2rem;
        right:0;
        width:5rem;
        height:6rem;
        background: transparent;
    }
    &:hover + ${ProfileDropdown} {
        display: block;
        opacity: 1;
    }
`

const ProfileHeader = styled.div`
    padding: 1rem 3rem;
    text-align: center;
    background: ${PALLETE.secondary};
    color: #fff;
    box-shadow: 0px 1px 2px -1px ${PALLETE.grey};
`

const ProfileElement = styled.div`
    background: #fff;
    color: ${PALLETE.secondary};
    padding: 1rem 3rem;
    text-align:center;
`

const LoginButton  = styled(Link)`
    text-decoration: none;
    display: block;
    background: ${PALLETE.secondary};
    color: #fff;
    padding: 1rem 3rem;
    border-radius: 0.5rem;
    text-align:center;
    cursor: pointer;
    user-select: none;
    &:hover {
        opacity: 0.85;
        &:active {
            transform: scale(0.98);
            transition: transform 50ms;
        }
    }
`
