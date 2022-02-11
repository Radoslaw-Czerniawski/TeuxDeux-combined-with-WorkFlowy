import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, get, child, update } from "firebase/database";
import { db as fireData } from "../DB/DB";
import styled, { keyframes } from "styled-components";
import { PALLETE } from "../Colors/colors";

export const AppendUserToList = ({ userInfo, setUserInfo }) => {
    const params = useParams();
    const [isDone, setIsDone] = useState(false);
    const [isSuccessfull, setIsSuccessfull] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (params && userInfo) {
            get(child(ref(fireData), `notes/${params.data}`))
                .then((snapshot) => {
                    if (!snapshot.exists()) {
                        setUserInfo((oldState) => ({
                            ...oldState,
                            currentHomeId: null,
                        }));
                        setIsDone(false);
                        setIsSuccessfull(false);

                        return false;
                    }
                    if (!snapshot.val().isShared) {
                        setUserInfo((oldState) => ({
                            ...oldState,
                            currentHomeId: null,
                        }));
                        setIsDone(false);
                        setIsSuccessfull(false);

                        return false;
                    }
                    const userData = {
                        displayName: userInfo.displayName,
                        hasAccess: true,
                    };

                    update(ref(fireData, `users/${userInfo.userUID}/`), { [params.data]: "" });

                    update(ref(fireData, `notes/${params.data}/users`), {
                        [userInfo.userUID]: userData,
                    }).then((res) => {
                        console.log(res);
                    });
                    return true;
                })
                .catch((error) => {
                    console.error(error);
                })
                .then((res) => {
                    setTimeout(() => {
                        if (res) {
                            setUserInfo((oldState) => ({
                                ...oldState,
                                currentHomeId: params.data,
                            }));
                        }
                        setIsDone(true);
                        setIsSuccessfull(res);
                    }, 1000); // I did just to show off the loading circle, this is its only purpose
                });
        }
    }, []);

    return (
        <ViewWrapper>
            {isDone ? (
                <div>
                    {isSuccessfull ? (
                        <div>
                            <Navigate to="/" replace={true} />
                        </div>
                    ) : (
                        <Error>ERROR_NOTE_NOT_FOUND<Navigate to="/" replace={true} /></Error>

                    )}
                </div>
            ) : (
                <Loader />
            )}
        </ViewWrapper>
    );
};

const ViewWrapper = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoaderKF = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
`;

const Loader = styled.div`
    border: 5px solid ${PALLETE.light};
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    clip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0 100%);
    animation: ${LoaderKF} infinite 1.4s linear;
`;

const Error = styled.div`
    font-size: 5rem;
    color: red;
`;
