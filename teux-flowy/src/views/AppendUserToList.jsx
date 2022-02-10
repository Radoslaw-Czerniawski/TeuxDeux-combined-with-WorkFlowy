import { useParams } from 'react-router-dom';
import { useEffect } from "react"

export const AppendUserToList = ({userInfo}) => {

    const params = useParams()

    useEffect(()=>{
        console.log(params.data)

    }, [])

    return (
        <div>
            Appending {userInfo} to list {params.data}

        </div>
     );
}
