import React, { FC, ReactNode } from "react";

interface AuthHOCProps {
  children: ReactNode;
}

export const AuthHOC: FC<AuthHOCProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <div>{children}</div>;
  } else {
    return
  }
};
