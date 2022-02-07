import { ListItem } from "../Components/List/ListItem";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group"

const StyledMainList = styled.ul`
    width: 100%;
    max-width:700px;
    margin: 5rem auto;
    min-height: 50vh;
`

function DynamicView({ currentNotes, cssAnimationState, setCssAnimationState  }) {

    const id = currentNotes.currentPath[currentNotes.currentPath.length - 1] || "HOME";
    const parentList = currentNotes.currentPath;

    return (
            <CSSTransition
                in={cssAnimationState}
                timeout={300}
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
