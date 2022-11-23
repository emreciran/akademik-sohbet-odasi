import axios from "../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/auth";

const useRefreshToken = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const data = {
        "Token": user?.authResult.token,
        "RefreshToken": user?.authResult.refreshToken
    };

    const refresh = async () => {
        const response = await axios.post('/auth/RefreshToken', data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });

        // setAuth(prev => {
        //     return {...prev, accessToken: response.data.authResult.token, refreshToken: response.data.authResult.refreshToken}
        // });

        dispatch(login(response.data))

        return response.data.authResult.token;
    }

    return refresh;
}

export default useRefreshToken;