import { createSlice } from "@reduxjs/toolkit";

type logInState = {
    user: {} | null
}

const initialState: logInState = {
    user: {}
}

const loginSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers:
    {
        setUser: (state: any, action) => {
            state.user = action.payload
        }
    }
})

export const {
    setUser
} = loginSlice.actions

export default loginSlice.reducer