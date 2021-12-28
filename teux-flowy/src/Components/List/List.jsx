import styled from "styled-components";
import { ListItem } from "./ListItem";

const ListContainer = styled.ul`
    padding-left: 2rem;
    position: relative;
`;

const DeleteItem = styled.button``;

const CoveringLine = styled.div`
    top: 0px;
    left: 2.3rem;
    position: absolute;
    width: 2px;
    height: 100%;
    background: grey;
    opacity: .4;
`

const List = ({ subList, parentList, parentNameList, isFirst }) => {
    console.log(subList.length)

    return (
        <ListContainer>

            {/* loop generating listItems */}
            {subList.map((id, index) => (
                <>
                    <ListItem
                        isFirst={false}
                        id={id}
                        key={id}
                        parentList={parentList}
                        parentNameList={parentNameList}
                    />
                    {(!isFirst && (index !== (subList.length))  ) &&
                        <CoveringLine />
                    }
                </>
            ))}

            {/* + button for adding listItem */}
        </ListContainer>
    );
};

export { List };
