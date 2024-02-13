import { createSlice } from "@reduxjs/toolkit";
import { ToDosType } from "../types/types";

type todoState = {
    toDoList: ToDosType | null,
}

const initialState: todoState = {
    toDoList: [],
}

const toDoSlice = createSlice({
    name: 'toDos',
    initialState,
    reducers:
    {
        setToDos: (state, action) => {
            state.toDoList = action.payload
        },
    }
})

export const {
    setToDos
} = toDoSlice.actions

export default toDoSlice.reducer