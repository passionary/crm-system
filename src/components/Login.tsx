import React, { useEffect, useState, useRef } from "react";
import "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { translate } from "../filters/translate";
import { authenticate, setToast } from '../actions'

const Login = ({authenticate, setToast, user}: any) => {  
  
  const [auth, setAuth] = useState(false);
  let email = useRef<HTMLInputElement>(null);
  let password = useRef<HTMLInputElement>(null);
  const [emailClasses, setEmailClass] = useState(["validate"]);
  const [passwordClasses, setPasswordClass] = useState(["validate"]);
  useEffect(() => {
    M.updateTextFields();
  }, []);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    if (!/[0-9a-z]+@[a-z]/.test(email.current!.value)) {
      setEmailClass([...emailClasses, "invalid"]);
      return false;
    }
    setEmailClass(["validate"]);
    if (password.current!.value.length < 3) {
      setPasswordClass([...passwordClasses, "invalid"]);
      return false;
    }
    setPasswordClass(["validate"]);

    const form = document.querySelector("#form");

    if (!form) return;
    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: new FormData(form as HTMLFormElement),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          setToast("You sign in!")
          authenticate(res.token);
          setAuth(true);
        }
      });
  };

  if (auth) {    
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="grey darken-1 empty-layout">
        <form className="card auth-card" onSubmit={submitHandler} id="form">
          <div className="card-content">
  <span className="card-title">{translate(user.language, 'CRM_Title')
  }</span>
            <div className="input-field">
              <input
                ref={email}
                id="email"
                name="email"
                type="text"
                className={emailClasses.join(" ")}
              />
              <label htmlFor="email">Email</label>
              {emailClasses.includes("invalid") && (
                <small className="helper-text invalid">Email</small>
              )}
            </div>
            <div className="input-field">
              <input
                ref={password}
                id="password"
                name="password"
                type="password"
                className={passwordClasses.join(" ")}
              />
              <label htmlFor="password">{translate(user.language, 'Password')}</label>
              {passwordClasses.includes("invalid") && (
                <small className="helper-text invalid">Password</small>
              )}
            </div>
          </div>
          <div className="card-action">
            <div>
              <button
                className="btn waves-effect waves-light auth-submit"
                type="submit"
              >
                {translate(user.language, 'Login')}
                <i className="material-icons right">send</i>
              </button>
            </div>

            <p className="center">
            {translate(user.language, 'NoAccount')}
              <NavLink to="/register">{translate(user.language, 'Register')}</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  authenticate,
  setToast
};

export default connect((state:any) => ({user: state.user}), mapDispatchToProps)(Login);
