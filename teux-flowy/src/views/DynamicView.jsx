import { ListItem } from "../Components/List/ListItem";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

// Firebase
import { onValue, ref, get, child } from "firebase/database";
import { db as fireData } from "../DB/DB";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight, faChevronCircleRight, faUserPlus
} from "@fortawesome/fontawesome-free-solid";
import {
    faUser
} from "@fortawesome/fontawesome-free-regular";
import { PALLETE } from "../Colors/colors";


function DynamicView({
    currentNotes,
    cssAnimationState,
    setCssAnimationState,
    userInfo,
    setUserInfo,
}) {
    const id =
        currentNotes.currentPath[currentNotes.currentPath.length - 1] || userInfo.currentHomeId;
    const parentList = currentNotes.currentPath;

    useEffect( () => {
        get(child(ref(fireData), `notes/${userInfo.currentHomeId}`))
        .then(response => console.log(response))

    }, []);

    const [isUsersTabVis, setIsUsersTabVis] = useState(false);

    const handleUsersListClick = () => {
        setIsUsersTabVis(oldState => !oldState)
    }

    // const handleAddUser = () => {
    //     const
    // }

    return (
        <ViewWrapper>
            <StyledUsersTab isExt={isUsersTabVis}>
                <StyledUsersTitle>
                    users
                </StyledUsersTitle>
                <StyledUser>
                    <FontAwesomeIcon icon={faUser} /> USER asd1
                </StyledUser>
                <StyledUser>
                    <FontAwesomeIcon icon={faUser} />
                    <StyledUserText>TWasdasdUJ STARY</StyledUserText>
                </StyledUser>
                <StyledAddUser>
                    <StyledAddUserIcon>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </StyledAddUserIcon>
                </StyledAddUser>

            </StyledUsersTab>
            <StyledUsersButtonTab>
                <StyledUsersTabButton isExt={isUsersTabVis} onClick={handleUsersListClick}>
                    <RotatingExtensionIcon
                        isExt={isUsersTabVis}
                        icon={faChevronCircleRight}
                    />
                </StyledUsersTabButton>
            </StyledUsersButtonTab>

            <CSSTransition in={cssAnimationState} timeout={300} classNames={"page"} unmountOnExit>
                <StyledMainList key={`main-list-${id}`}>
                    <ListItem
                        userInfo={userInfo}
                        parentLocalAnimationState={undefined}
                        setCssAnimationState={setCssAnimationState}
                        cssAnimationState={cssAnimationState}
                        id={id}
                        isFirst={true}
                        isFirstInList={true}
                        isLastInList={true}
                        parentSublist={null}
                        parentNameList={currentNotes.names}
                        parentList={parentList}
                        parentChangeSyncStatus={undefined}
                        key={id}
                    />
                </StyledMainList>
            </CSSTransition>



        </ViewWrapper>
    );
}

export { DynamicView };

const ViewWrapper = styled.div`
    width: 100%;
    max-width: 100rem;
    margin: 0;
    display: flex;
`

const StyledMainList = styled.ul`
    min-height: 50vh;
    flex-grow:1;
`;

const StyledUsersButtonTab = styled.div`
    margin: 2rem 0;
    font-size: 1.4rem;
    overflow: hidden;
`

const StyledUsersTabButton = styled.button`
    padding: 1rem 2rem;
    background: ${props => props.isExt ? PALLETE.secondary : "transparent"};
    border: 1px solid ${PALLETE.secondary};
    border-left: none;
    color: ${props => props.isExt ? "#fff" : PALLETE.secondary};
    --border-r: 6rem;
    border-radius: 0 var(--border-r) var(--border-r) 0;
    cursor: pointer;
    transition: background-color 0.4s;
    z-index:-1;
    &:hover{
        background: ${props => props.isExt ? PALLETE.secondary : PALLETE.light};
        color: #fff;
    }
`

const StyledUsersTitle = styled.div`
    font-size:1.6rem;
    color: ${PALLETE.secondary};
    margin: 2rem 2rem;
    padding: 1rem;
    text-transform: uppercase;
    border-bottom: 1px solid ${PALLETE.secondary};
`

const StyledUsersTab = styled.div`
    padding: 0;
    border-right: 1px solid ${PALLETE.secondary};
    max-width: ${props => props.isExt ? "30rem" : "0"};
    color: ${props => props.isExt ? PALLETE.secondary : "rgba(0,0,0,0)"};
    opacity: ${props => props.isExt ? "1" : "0"};
    overflow: hidden;
    transition: max-width 0.4s, background-color 0.4s, opacity 0.3s;
    z-index:0;
`

const StyledUser = styled.div`
    padding: 1rem 2rem;
    font-size: 1.2rem;
    display: flex;
    text-transform: uppercase;
    justify-content: space-between;
`

const StyledAddUser = styled.div`
    padding: 2rem 2rem;
    font-size: 1.2rem;
    display: flex;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
`

const StyledAddUserIcon = styled.button`
    padding:1.2rem;
    color: inherit;
    border-radius: 100%;
    border: 1px solid ${PALLETE.secondary};
    background: transparent;
    transition: background-color 0.3s, transform 0.3s;
    &:hover{
        background-color: ${PALLETE.lightST};
        transform: scale(1.05);
        cursor: pointer;
    }
    &:active{
        background-color: ${PALLETE.lightST};
        transform: scale(0.97);
        cursor: pointer;
    }
`

const StyledUserText = styled.span`
    margin: 0 0 0 4rem;
`

const RotatingExtensionIcon = styled(FontAwesomeIcon)`
    transform: ${props => props.isExt ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.4s;
    font-size: 1.8rem;
`

