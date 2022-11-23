import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {

    const {user} = useSelector(state => state.auth);
    const location = useLocation();
    if(!user){
        return <Navigate to="/auth/giris" replace={true} state={{
            return_url: location.pathname
        }} />
    }
  return(
    user?.role?.find(r => allowedRoles?.includes(r))
        ? children
        : !user
            ? <Navigate to="/auth/giris" replace={true} state={{
                return_url: location.pathname
            }} />
            : <Navigate to={user.role.includes("Admin") ? "/admin" : "/"} replace={true} state={{
                return_url: location.pathname
            }} />
  )
}

export default PrivateRoute