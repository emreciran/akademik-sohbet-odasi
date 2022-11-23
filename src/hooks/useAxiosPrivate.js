import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {user} = useSelector(state => state.auth)
     
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${user?.authResult.token}`
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config; 

                // if (isExpired){
                //     prevRequest.sent = true;
                //     const newAccessToken = await refresh();
                //     console.log(newAccessToken);
                //     prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                //     return axiosPrivate(prevRequest);
                // }
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    window.location.reload();
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [user, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;