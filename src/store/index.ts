import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './login-slice'
import toDosReducer from './toDos-slice'
import usersReducer from './users-slice'
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        logIn: loginReducer,
        toDos: toDosReducer,
        users: usersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: ()=> AppDispatch = useDispatch
