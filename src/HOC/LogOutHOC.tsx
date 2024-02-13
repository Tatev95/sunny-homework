import React, { FC, ReactNode } from "react";
import { userSelector } from "../store/login-selector";
import { useSelector } from "react-redux";
import { LoginConstants } from "../constants/LoginConstants";

interface LogOutHOCProps {
    children: ReactNode;
}

export const LogOutHOC: FC<LogOutHOCProps> = ({ children }) => {
    const token = localStorage.getItem('token')
    const user = useSelector(userSelector);


    return (
        <>
            {!token && JSON.stringify(user) !== JSON.stringify(LoginConstants.userData) && (
                <div>
                    {children}
                </div>
            )}
        </>
    );
};

