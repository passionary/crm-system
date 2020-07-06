import React, { useEffect, useState } from "react";
import "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = (props: any) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    M.updateTextFields();
  }, []);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.querySelector("#form");

    if (!form) return;
    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: new FormData(form as HTMLFormElement),
    })
      .then((res) => res.json())
      .then((res) => {        
        if (res.token) {
          props.auth(res.token);
          setAuth(true);
        }
      });
  };
  if (auth) return <Redirect to="/" />;
  return (
    <div>
      <div className="grey darken-1 empty-layout">
        <form className="card auth-card" onSubmit={submitHandler} id="form">
          <div className="card-content">
            <span className="card-title">Домашняя бухгалтерия</span>
            <div className="input-field">
              <input id="email" name="email" type="text" className="validate" />
              <label htmlFor="email">Email</label>
              <small className="helper-text invalid">Email</small>
            </div>
            <div className="input-field">
              <input id="password" name="password" type="password" className="validate" />
              <label htmlFor="password">Пароль</label>
              <small className="helper-text invalid">Password</small>
            </div>
          </div>
          <div className="card-action">
            <div>
              <button
                className="btn waves-effect waves-light auth-submit"
                type="submit"
              >
                Войти
                <i className="material-icons right">send</i>
              </button>
            </div>

            <p className="center">
              Нет аккаунта?
              <a href="/">Зарегистрироваться</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const auth = (token: string) => {
  return {
    type: "auth",
    payload: token,
  };
};
const mapDispatchToProps = {
  auth,
};

export default connect(null, mapDispatchToProps)(Login);
