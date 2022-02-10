import styled from "styled-components";
import { faCalendar } from '@fortawesome/fontawesome-free-regular'
import { DialogContext } from "../../ContextApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import {parseJSON} from "date-fns"
import { useEffect, useState } from "react"

const ListElementDate = styled.div`
    font-size: 1.2rem;
    opacity: 0.5;
    margin-top: 0.5rem;
    min-height: 1.2rem;
`
const StyledClickableDate = styled.div`
    cursor: pointer;
`

export const ListElementDateComponent = ({isFirst, listItemObjectDate, setIsDialogOn}) => {

    const [date, setDate] = useState(null)

    useEffect(()=>{
        const date = parseJSON(listItemObjectDate.date);
        let formatDate = null;
        try {
            formatDate = format(date, "yyyy-MM-dd");
        } catch (err) {
            setDate(null);
            return
        }
        setDate(formatDate)
    }, [])

    return <ListElementDate isFirst={isFirst}>
        {listItemObjectDate.hasDate && <StyledClickableDate
                        onClick={() => {
                        setIsDialogOn(true);
                    }}>

            {date}
            </StyledClickableDate>
        }
        </ListElementDate>

}

export default ListElementDateComponent;
