import styled from "styled-components";
import { faCalendar } from '@fortawesome/fontawesome-free-regular'
import {  DialogContext } from "../../ContextApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ListElementDate = styled.div`
    font-size: 1.2rem;
    opacity: 0.5;
    min-height: 1.2rem;
`

export const ListElementDateComponent = ({isFirst, listItemObjectDate, id}) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return <ListElementDate isFirst={isFirst}>
        {listItemObjectDate.hasDate ? <DialogContext.Consumer>
            {ContextDialog => <div onClick={() => {
                            ContextDialog.setDialogParams({id: id, isOn: true});
                        }}>
            <FontAwesomeIcon icon={faCalendar} />
            
            {listItemObjectDate.date.split("T", 1)} </div>
            }</DialogContext.Consumer> : <> </> }
        </ListElementDate>
      
}
 
export default ListElementDateComponent;