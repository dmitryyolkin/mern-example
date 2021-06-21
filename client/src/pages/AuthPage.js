import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/auth.context";

import "materialize-css";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", {
        ...form,
      });
      console.log(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", {
        ...form,
      });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  const keyPressHandler = async (event) => {
    if (event.key === "Enter") {
      // login
      await loginHandler();
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s4">
        <h1>Links dictionary</h1>
        {/* Add input fields for email / password  */}
        {/* It was taken from https://materializecss.com/text-inputs.html  */}
        <div className="row">
          <div className="col s9 m6 l9">
            <div className="card blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Authentication</span>
                <div>
                  <div className="input-field">
                    <i className="material-icons prefix">mail_outline</i>
                    <input
                      placeholder="Input email"
                      id="email"
                      type="text"
                      name="email"
                      className="yellow-input"
                      onChange={changeHandler}
                    />
                    <label htmlFor="email" className="active">
                      Email
                    </label>
                  </div>
                  <div className="input-field">
                    <i className="material-icons prefix">lock_outline</i>
                    <input
                      placeholder="Input password"
                      id="password"
                      type="password"
                      name="password"
                      className="yellow-input"
                      onChange={changeHandler}
                      onKeyPress={keyPressHandler}
                    />
                    <label htmlFor="password" className="active">
                      Password
                    </label>
                  </div>
                </div>
              </div>
              <div className="card-action right-align">
                <button
                  className="btn yellow darken-4 mr10"
                  onClick={loginHandler}
                  disabled={loading}
                >
                  Sign in
                </button>
                <button
                  className="btn grey lighten-1 black-text"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
