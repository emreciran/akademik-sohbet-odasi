import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    user: JSON.parse(localStorage.getItem("token")) || false,
    userDetails: JSON.parse(localStorage.getItem("user")) || false,
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            if(action.payload){
                localStorage.setItem("token", JSON.stringify(action.payload))
            } else{
                localStorage.removeItem("token")
            }

            state.user = action.payload
        },
        setUser: (state, action) => {
            if(action.payload){
                localStorage.setItem("user", JSON.stringify(action.payload))
            } else{
                localStorage.removeItem("user")
            }

            state.userDetails = action.payload
        }
    }
})

export const {login, setUser} = auth.actions
export default auth.reducer