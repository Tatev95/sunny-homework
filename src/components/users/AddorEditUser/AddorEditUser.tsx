import React, { ChangeEvent, FC, useCallback, useEffect, useState, } from "react";
import { useAppDispatch } from "../../../store";
import { addUser, editUser, updateUser } from "../../../store/users-slice";
import { AddorEditUserProps } from "../../../types/types";
import { useSelector } from "react-redux";
import { editedIdSelector, editedUserSelector } from "../../../store/users-selector";
import './addOrEditusers.css';


export const AddorEditUser: FC<AddorEditUserProps> = (
    { handleToggleAdd, handleCloseEdit, title }
) => {
    const dispatch = useAppDispatch()
    const editedUser = useSelector(editedUserSelector);
    const editedId = useSelector(editedIdSelector);

    const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(editUser({
            ...editedUser,
            name: e.target.value,
        }))
    }, [editedUser])

    const handleAgeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(editUser({
            ...editedUser,
            age: e.target.value,
        }))
    }, [editedUser])

    const handleAddUser = useCallback(() => {
        const newUser = {
            name: editedUser.name,
            age: editedUser.age
        };

        dispatch(addUser(newUser));
        handleToggleAdd(false)
    }, [dispatch, editedUser]);

    const handleEditUser = useCallback(() => {
        dispatch(updateUser({
            userId: editedId,
            updatedUser: {
                name: editedUser?.name,
                age: editedUser?.age
            }
        }))
        handleCloseEdit()
    }, [editedUser])

    return (
        <div className="add_popup">
            <div className="add_header">
                <h2>{title}</h2>
                <button
                    className="close_popup"
                    onClick={() => {
                        handleToggleAdd(false)
                        handleCloseEdit()
                    }}
                >
                    X
                </button>
            </div>

            <div className="add_form">
                <input
                    type="text"
                    className="add_name"
                    placeholder="Name"
                    onChange={handleNameChange}
                    value={editedUser.name}

                />
                <input
                    type="text"
                    className="add_age"
                    placeholder="Age"
                    onChange={handleAgeChange}
                    value={editedUser.age || ''}
                />
                {
                    title === 'Add User' ? (
                        <button
                            className="add_button"
                            onClick={handleAddUser}
                        >
                            {title}
                        </button>
                    ) : (
                        <button
                            className="add_button"
                            onClick={handleEditUser}
                        >
                            {title}
                        </button>
                    )
                }

            </div>


        </div>
    );
};



