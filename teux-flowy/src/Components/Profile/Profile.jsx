import styled from "styled-components";
import { faUserCircle } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PALLETE } from "../../Colors/colors";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const Profile = ({ userInfo, setUserInfo }) => {
    const navigation = useNavigate();

    const handleUserLogout = useCallback(() => {
        window.localStorage.removeItem("userInfo");

        window.location.reload();
    }, []);

    return (
        <ProfileContainer>
            <ProfileIcon>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </ProfileIcon>
            <ProfileDropdown>
                {userInfo.isLogged && (
                    <>
                        <ProfileHeader>Profile</ProfileHeader>
                        <DropDownListItemsWrapper>
                            <ProfileElement1>{userInfo.displayName}</ProfileElement1>
                            <ProfileElement2 onClick={handleUserLogout}>Log out</ProfileElement2>
                        </DropDownListItemsWrapper>
                    </>
                )}

                {!userInfo.isLogged && (
                    <DropDownListItemsWrapper>
                        <ProfileHeaderLogout>Not logged in</ProfileHeaderLogout>
                        <ProfileElement2>Log in</ProfileElement2>
                    </DropDownListItemsWrapper>
                )}
            </ProfileDropdown>
        </ProfileContainer>
    );
};

const ProfileDropdown = styled.div`
    display: none;
    opacity: 0;
    position: absolute;
    top: calc(100% + 2rem);
    right: 0;
    border-radius: 0.5rem;
    overflow: hidden;
    max-width: 50vw;
    min-width: 15rem;
    transition: opacity 0.3s;
    box-shadow: 0 1px 4px 0 rgb(128 128 128 / 80%);
    background: #fff;
    z-index: 5;
    &:hover {
        display: block;
        opacity: 1;
        transition: opacity 1s;
    }
`;

const ProfileContainer = styled.div`
    color: ${PALLETE.secondary};
    position: relative;
`;

const ProfileIcon = styled.div`
    &:hover::before {
        content: "";
        position: absolute;
        bottom: -2rem;
        right: 0;
        width: 5rem;
        height: 6rem;
        background: transparent;
    }
    &:hover + ${ProfileDropdown} {
        display: block;
        opacity: 1;
    }
`;

const ProfileHeader = styled.div`
    padding: 1rem 3rem;
    text-align: center;
    background: ${PALLETE.secondary};
    z-index: 4;
    color: white;
`;

const ProfileElement1 = styled.div`
    user-select: none;
    padding: 1rem 3rem;
    text-align: center;
    background-color: white;
    box-shadow: 0 1px 2px -0.5px rgb(128 128 128 / 80%);
    border-radius: 0 0 0.5rem 0.5rem;
    z-index: 1;
`;

const DropDownListItemsWrapper = styled.div`
    overflow: hidden;
    box-shadow: 0 1px 2px -0.5px rgb(128 128 128 / 80%);
    background-color: ${PALLETE.lightGrey};
    background: ${PALLETE.lightGrey};
`;

const ProfileHeaderLogout = styled(ProfileHeader)`
    padding: 1rem 3rem;
    text-align: center;
    background: ${PALLETE.secondary};
    z-index: 4;
    color: white;
    box-shadow: 0 1px 2px -0.5px rgb(128 128 128 / 80%);
`;

const ProfileElement2 = styled(ProfileElement1)`
    background-color: transparent;
    border: none;
    color: ${PALLETE.grey};
    padding: 1rem 3rem;
    border-radius: 0;
    text-align: center;
    z-index: 1;
    cursor: pointer;
    font-weight: 700;
    &:hover {
        background-color: transparent;
        color: ${PALLETE.active};

`;
