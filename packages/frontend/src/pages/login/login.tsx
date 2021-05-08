import React, {ReactElement, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import hash from "object-hash";
import {UAParser} from "ua-parser-js";
import {authService} from "../../api/auth/auth-service";
import {usersService} from "../../api/users/users-service";
import {Store} from "../../store/store";
import {actions} from "../../store/actions";
import {setItemsToLocalStorage} from "../../utils/local-storage";
import "./login.scss";

const uaParser = new UAParser();

export function Login(): ReactElement {
  const dispatch = useDispatch();

  const [action, setAction] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const accessToken = useSelector((state: Store) => state.auth.accessToken);

  async function login(e) {
    e.preventDefault();
    if (!email || !password) return alert("Данные не были введены");
    const authRes = await authService.login({email, password, uaHash: hash(uaParser.getUA())});
    const {accessToken, refreshToken, expiresIn, userId} = authRes.data;
    setItemsToLocalStorage({accessToken, refreshToken, expiresIn, userId});
    dispatch(actions.auth.setAuth({accessToken, refreshToken, expiresIn}));
    const userRes = await usersService.getInfo(userId);
    dispatch(actions.user.setUser(userRes.data));
  }

  async function register(e) {
    e.preventDefault();
    if (!email || !password) return alert("Данные не были введены");
    if (password !== secondPassword) return;

    const authRes = await authService.register({
      email,
      fullName,
      password,
      uaHash: hash(uaParser.getUA())
    });
    const {accessToken, refreshToken, expiresIn, userId} = authRes.data;
    setItemsToLocalStorage({accessToken, refreshToken, expiresIn, userId});
    dispatch(actions.auth.setAuth({accessToken, refreshToken, expiresIn}));
    const userRes = await usersService.getInfo(userId);
    dispatch(actions.user.setUser(userRes.data));
  }

  function changeAction(newAction) {
    setAction(newAction);
    setEmail("");
    setPassword("");
    setSecondPassword("");
  }

  if (!accessToken) {
    return (
      <div className="login-page">
        <div className="landing-wrapper">
          <div className="landing-wrapper__form-wrapper">
            {action === "login" && (
              <form onSubmit={login} className="login-form">
                <h2 className="login-form__heading">Login</h2>
                <label className="login-form__label">Email</label>
                <input
                  className="login-form__form-control"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <label className="login-form__label"> Password</label>
                <input
                  type="password"
                  className="login-form__form-control"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-form__btn">
                  <span>Log in</span>
                </button>
                <a onClick={() => changeAction("register")}>
                  <span className="login-form__toggle-link">Register</span>
                </a>
              </form>
            )}
            {action === "register" && (
              <form onSubmit={register} className="login-form">
                <h2 className="login-form__heading">Register</h2>
                <label className="login-form__label">Full name</label>
                <input
                  className="login-form__form-control"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
                <label className="login-form__label">Email</label>
                <input
                  className="login-form__form-control"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <label className="login-form__label"> Password</label>
                <input
                  type="password"
                  className="login-form__form-control"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="login-form__label"> Repeat a password </label>
                <input
                  type="password"
                  className={`login-form__form-control ${password !== secondPassword && "error"}`}
                  value={secondPassword}
                  placeholder="Enter your password again"
                  onChange={(e) => setSecondPassword(e.target.value)}
                />
                {password !== secondPassword && (
                  <p className="login-form__error-message" style={{color: "red"}}>
                    Password mismatch
                  </p>
                )}
                <button type="submit" className="login-form__btn">
                  <span>Register</span>
                </button>
                <a onClick={() => changeAction("login")}>
                  <span className="login-form__toggle-link">Sign in</span>
                </a>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect exact to="/" />;
  }
}
