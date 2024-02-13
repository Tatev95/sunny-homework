import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "."


export const toDosSelector = (state: RootState) => state.toDos

export const toDoListSelector = createSelector(toDosSelector, (toDos) => toDos.toDoList)

