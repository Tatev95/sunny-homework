import React, { FC, useCallback, useEffect, } from "react";
import { useSelector } from "react-redux";
import { toDoListSelector } from "../../store/todos-selector";
import { getToDos } from "../../controller";
import { useNavigate } from "react-router-dom";
import './todos.css'


export const Todos: FC = () => {
    const navigate = useNavigate();

    const todoList = useSelector(toDoListSelector);

    useEffect(() => {
        getToDos();
    }, []);

    const handleLogOut = useCallback(() => {
        localStorage.removeItem('token')
        navigate("/");
        window.location.reload();
    }, [])

    const handlGoToUsers = useCallback(() => {
        navigate("/users");
    }, [])

    return (
        <>
            <h2>Todos</h2>
            <button onClick={handleLogOut}>LogOut</button>
            <h3 className="users" onClick={handlGoToUsers}>USERS</h3>

            <table className="table-container">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList?.map((todo, id) => (
                        <tr key={id} className="todo_tr">
                            <td className="todo_td">{todo.userId}</td>
                            <td className="todo_td">{todo.id}</td>
                            <td className="todo_td">{todo.title}</td>
                            <td className="todo_td">{todo.completed.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};



