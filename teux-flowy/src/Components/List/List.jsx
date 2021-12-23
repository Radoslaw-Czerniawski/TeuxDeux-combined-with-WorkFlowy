import styled from "styled-components";
import { ListItem } from "./ListItem";

const ListContainer = styled.ul`
    padding-left: 20px;
`;

const DeleteItem = styled.button``;

const List = ({ subList }) => {
    return (
        <ListContainer>
            {/* loop generating listItems */}
            {subList.map((id) => (
                <ListItem id={id} />
            ))}

            {/* + button for adding listItem */}
        </ListContainer>
    );
};

export { List };
