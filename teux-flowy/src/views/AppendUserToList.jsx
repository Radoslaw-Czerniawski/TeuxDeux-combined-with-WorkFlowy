import { useParams } from 'react-router-dom';
import { useEffect } from "react"
import { onValue, ref, get, child, update, set } from "firebase/database";
import { db as fireData } from "../DB/DB";
import { addListToUser } from '../Components/Header/Header';

export const AppendUserToList = ({userInfo}) => {

    const params = useParams()

    useEffect(() => {
        console.log(`Add list: ${params.data} to user: ${userInfo.userUID}`)
        //get(child(ref(fireData), `notes/${userInfo}`))
    }, [])

    return (
        <div>


        </div>
     );
}
