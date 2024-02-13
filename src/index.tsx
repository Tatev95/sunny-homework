import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { Login } from "./components/login";
import { Timer, Todos, Users } from "./components";
import { AuthHOC } from "./HOC/AuthHOC";
import { LogOutHOC } from "./HOC/LogOutHOC";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StreamComponent } from "./components/streamComponent";

const root = ReactDOM.createRoot(document.getElementById('root')!);


root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<LogOutHOC><Login /></LogOutHOC>} /> */}
                <Route path="/login" element={<LogOutHOC><Login /></LogOutHOC>} />
                <Route path="/todos" element={<AuthHOC><Todos /></AuthHOC>} />
                <Route path="/users" element={<AuthHOC><Users /></AuthHOC>} />
                <Route path="/timer" element={<AuthHOC><Timer /></AuthHOC>} />
                <Route path="/" element={<LogOutHOC><StreamComponent/></LogOutHOC>} />
            </Routes>
        </BrowserRouter>
    </Provider>
);
