import { ListItem } from "../Components/List/ListItem";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group"
import { useEffect, useState } from "react";

const StyledMainList = styled.ul`
    max-width:700px;
    margin: 5rem auto;
`

function DynamicView({ currentNotes, cssAnimationState, setCssAnimationState  }) {



    const id = currentNotes.currentPath[currentNotes.currentPath.length - 1] || "HOME";
    const parentList = currentNotes.currentPath;


    return (
        <CSSTransition
            in={cssAnimationState}
            timeout={500}
            classNames={"page"}
            unmountOnExit
        >
            <StyledMainList key={`main-list-${id}`}>
                <ListItem
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
    );
}

export { DynamicView };
