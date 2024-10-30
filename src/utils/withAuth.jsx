import { Navigate } from "react-router-dom";

const WithAuth = (Component) => (props) => {
    const token = localStorage.getItem('token')

    if(!token)
    {
        return <Navigate to="/" replace />;
    }

    return <Component {...props} />
}

export default WithAuth