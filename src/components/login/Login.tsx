import React, {
  ChangeEvent,
  FC,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/login-slice";
import { LoginConstants } from "../../constants/LoginConstants";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = LoginConstants

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handChange =
    (setState: any) => (event: ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };

  const handleLogin = () => {

    const user = {
      login,
      password,
    };

    if (login == userData.login && password == userData.password) {
      dispatch(setUser(user));

      const tokenText = Math.random().toString(36).substring(7);
      localStorage.setItem("token", tokenText);

      navigate("/todos");
      return
    }
    else {
      alert('enter valid login or password')
    }
  };

  return (
    <>
      <h2>Login</h2>
      <div className="login_form">
        <input
          className="input_field"
          type="text"
          value={login}
          onChange={handChange(setLogin)}
        />
        <input
          className="input_field"
          type="password"
          value={password}
          onChange={handChange(setPassword)}
        />
      </div>
      <button className="login_button" onClick={handleLogin}>
        Login
      </button>
    </>
  );
};
