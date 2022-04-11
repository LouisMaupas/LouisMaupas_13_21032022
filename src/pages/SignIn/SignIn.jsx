import { Link, useNavigate, Navigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { postLogin, postToken } from "../../utils/apiRequest";
import { userLogin } from "../../features/slices/auth";
import { handleUserProfile } from "../../features/slices/user";
import { useLogged } from "../../utils/hooks/customHooks";

/**
 *
 * @returns
 */
export default function SignIn() {
  /**
   * Declare variables
   */
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    logged = useLogged(),
    [userName, setUserName] = useState(""),
    [userPassword, setUserPassword] = useState(""),
    [error, setError] = useState("");

  /**
   * At user form submit, do a http post login with data then get and  token and stock token
   * @param {Event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    postLogin(e.target[0].value, e.target[1].value)
      .then(async (res) => {
        const token = res?.data?.body?.token;
        if (token) {
          postToken(token)
            .then(async (response) => {
              dispatch(handleUserProfile(response.data.body));
              dispatch(userLogin(token));
              localStorage.setItem("token", token);
              navigate("/dashboard");
            })
            .catch((error) => {
              setError(error);
              console.log(error);
            });
        } else {
          navigate("/http-error");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input name="username" type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <input
            type="submit"
            className="sign-in-button"
            to="/user"
            value={"sign-In"}
          />
        </form>
      </section>
    </main>
  );
}
