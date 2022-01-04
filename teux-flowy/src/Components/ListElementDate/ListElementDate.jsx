import styled from "styled-components";

const ListElementDate = styled.div`
    font-size: 1.2rem;
    opacity: 0.5;
`

export const ListElementDateComponent = ({isFirst, listItemObjectDate}) => {
    return <ListElementDate isFirst={isFirst}>
         {listItemObjectDate.hasDate ? <>
         listItemObjectDate.date
         listItemObjectDate.hasDate </> : <> icon </> }
        </ListElementDate>
      
}
 
export default ListElementDateComponent;