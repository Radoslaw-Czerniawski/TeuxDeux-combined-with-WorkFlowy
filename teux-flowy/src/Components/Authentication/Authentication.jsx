import { Navigate } from "react-router-dom";

const Authentication = ({children, isLogged}) => {
    if(isLogged) {
        return children
    } else {
        return <Navigate to="login" />
    }
}

export { Authentication };
