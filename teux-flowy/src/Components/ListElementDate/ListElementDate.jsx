import styled from "styled-components";
import { faCalendar } from '@fortawesome/fontawesome-free-regular'
import {  DialogContext } from "../../ContextApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import {parseJSON} from "date-fns"

const ListElementDate = styled.div`
    font-size: 1.2rem;
    opacity: 0.5;
    min-height: 1.2rem;
`
const StyledClickableDate = styled.div`
    cursor: pointer;
`

export const ListElementDateComponent = ({isFirst, listItemObjectDate, setIsDialogOn}) => {

    return <ListElementDate isFirst={isFirst}>
        {listItemObjectDate.hasDate && <StyledClickableDate
                        onClick={() => {
                        setIsDialogOn(true);
                    }}>

            {format(parseJSON(listItemObjectDate.date), "yyyy-MM-dd")}
            </StyledClickableDate>
        }
        </ListElementDate>

}

export default ListElementDateComponent;
