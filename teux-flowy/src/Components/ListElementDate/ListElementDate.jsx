import styled from "styled-components";

const ListElementDate = styled.div`
    margin-left: ${(props) => props.isFirst ? "4rem" : "6.8rem"};
    visibility: ${(props) => props.hasDate ? "visible" : "hidden"};
    font-size: 1.2rem;
    opacity: 0.5;
`

export const ListElementDateComponent = ({isFirst, listItemObjectDate}) => {
    return <ListElementDate isFirst={isFirst} hasDate={listItemObjectDate.hasDate}>
        {listItemObjectDate.date}
        </ListElementDate>
      
}
 
export default ListElementDateComponent;