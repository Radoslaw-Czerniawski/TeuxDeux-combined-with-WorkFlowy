import styled from "styled-components";
import { ListItem } from "./ListItem";

const ListContainer = styled.ul`
    padding-left: 20px;
`;

const DeleteItem = styled.button``;

const List = ({ subList, parentList }) => {
    return (
        <ListContainer>
            {/* loop generating listItems */}
            {subList.map((id) => (
                <ListItem id={id} parentList={parentList}/>
            ))}

            {/* + button for adding listItem */}
        </ListContainer>
    );
};

export { List };
