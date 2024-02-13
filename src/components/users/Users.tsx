import React, { FC, useCallback, useEffect, useState, } from "react";
import './users.css'
import { useSelector } from "react-redux";
import { deleteUser, editUser, getUsers, setEditedId } from "../../store/users-slice";
import { editedUserSelector, userSListSelector } from "../../store/users-selector";
import { useAppDispatch } from "../../store";
import { AddorEditUser } from "./AddorEditUser";
import { Link } from "react-router-dom";


export const Users: FC = () => {
    const dispatch = useAppDispatch()
    type UserAction = ReturnType<typeof getUsers>;

    const users = useSelector(userSListSelector);
    const editedUser = useSelector(editedUserSelector);

    const [openAddPopup, setOpenAddPopup] = useState(false)
    const [openEditPopup, setOpenEditPopup] = useState(false)

    useEffect(() => {
        // dispatch(getUsers())
    }, [])

    const handleToggleAdd = useCallback((isopen: boolean) => {
        setOpenAddPopup(!openAddPopup)
    }, [openAddPopup])

    const handleOpenEdit = useCallback((id: any) => {
        setOpenEditPopup(!openAddPopup)
        const editedUser = users.filter((user) => user.id === id)
        dispatch(editUser(editedUser[0]))
        dispatch(setEditedId(editedUser[0].id))

    }, [openAddPopup, users])

    // const handleDeleteUser = useCallback((id: any) => {
    //     dispatch(deleteUser(id + ''))
    // }, [dispatch])

    const handleCloseEdit = useCallback(() => {
        handleToggleAdd(false)
        setOpenEditPopup(false)
        setOpenAddPopup(false)
        dispatch(editUser({
            ...editedUser,
            name: '',
            age: 0
        }))
    }, [])

    return (
        <div className="users_content">
            <Link to={'/todos'}>Go to Todos</Link>
            <br />
            <br />
            <Link to={'/timer'}>Go to TIMER</Link>
            <h2>Users</h2>
            <h3
                className="add_users"
                onClick={() => handleToggleAdd(true)}
            >
                Add users
            </h3>
            {openAddPopup && (
                <AddorEditUser handleToggleAdd={handleToggleAdd} title='Add User' handleCloseEdit={() => { }} />
            )}
            {openEditPopup && (
                <AddorEditUser handleToggleAdd={() => { }} handleCloseEdit={handleCloseEdit} title='Edit the User' />
            )}
            <table className="table-container">
                {users?.length > 0 ? (
                    <>
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Name</th>
                                <th>age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr className="todo_tr" key={user.id}>
                                    <td className="user_td">{user.id}</td>
                                    <td className="user_td">{user.name}</td>
                                    <td className="user_td">{user.age}</td>
                                    {/* <td className="delete_td" onClick={() => handleDeleteUser(user.id)}>delete user</td> */}
                                    <td className="edit_td" onClick={() => handleOpenEdit(user.id)} >edit user</td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : (
                    <tbody>
                        <tr className="empty_table">
                           <td>Empty Table</td> 
                        </tr>
                    </tbody>
                )}
            </table>

        </div>
    );
};



