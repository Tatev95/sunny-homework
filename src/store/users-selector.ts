import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "."


export const usersSelector = (state: RootState) => state.users

export const userSListSelector = createSelector(usersSelector, (users) => users.usersList)


export const addUserSelector = createSelector(usersSelector, (users) => users.addValues)

export const editedUserSelector = createSelector(usersSelector, (users) => users.editedUser)

export const editedIdSelector = createSelector(usersSelector, (users) => users.editedId)
