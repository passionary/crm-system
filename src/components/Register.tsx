import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { translate } from "../filters/translate";
import { authenticate, setToast } from "../actions";

const Register = ({ authenticate, user, setToast }: any) => {
  const [auth, setAuth] = useState(false);
  let email = useRef<HTMLInputElement>(null);
  let password = useRef<HTMLInputElement>(null);
  let name = useRef<HTMLInputElement>(null);
  let amount = useRef<HTMLInputElement>(null);
  const [emailClasses, setEmailClass] = useState(["validate"]);
  const [passwordClasses, setPasswordClass] = useState(["validate"]);
  const [nameClasses, setnameClass] = useState(["validate"]);
  const [amountClasses, setAmountClass] = useState(["validate"]);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    M.updateTextFields();
  }, []);
  const accessHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccess(!access);
  };
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

    if (name.current!.value.length < 3) {
      setnameClass([...nameClasses, "invalid"]);
      return false;
    }
    if (!amount.current!.value.length) {
      setAmountClass([...amountClasses, "invalid"]);
      return false;
    }
    setnameClass(["validate"]);
    if (!access) {
      setToast("You need access our rules");
      return false;
    }
    const form = document.querySelector("#form");

    if (!form) return;
    fetch("http://127.0.0.1:8000/api/registr", {
      method: "POST",
      body: new FormData(form as HTMLFormElement),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setToast(Object.values(res.errors)[0]);
          return;
        }
        if (res.token) {
          authenticate(res.token);
          setAuth(true);
        }
      })
      .catch((e) => setToast(translate(user.language, "CatchError")));
  };
  if (auth) return <Redirect to="/" />;
  return (
    <div>
      <div className="grey darken-1 empty-layout">
        <form className="card auth-card" onSubmit={submitHandler} id="form">
          <div className="card-content">
            <span className="card-title">
              {translate(user.language, "CRM_Title")}
            </span>
            <div className="input-field">
              <input
                id="email"
                name="email"
                type="text"
                className={emailClasses.join(" ")}
                ref={email}
              />
              <label htmlFor="email">Email</label>
              {emailClasses.includes("invalid") && (
                <small className="helper-text invalid">Email</small>
              )}
            </div>
            <div className="input-field">
              <input
                name="password"
                id="password"
                type="password"
                className={passwordClasses.join(" ")}
                ref={password}
              />
              <label htmlFor="password">
                {translate(user.language, "Password")}
              </label>
              {passwordClasses.includes("invalid") && (
                <small className="helper-text invalid">Password</small>
              )}
            </div>
            <div className="input-field">
              <input
                name="name"
                id="name"
                type="text"
                className={nameClasses.join(" ")}
                ref={name}
              />
              <label htmlFor="name">{translate(user.language, "Name")}</label>
              {nameClasses.includes("invalid") && (
                <small className="helper-text invalid">Name</small>
              )}
            </div>
            <div className="input-field">
              <input
                id="amount"
                name="amount"
                type="text"
                className={amountClasses.join(" ")}
                ref={amount}
              />
              <label htmlFor="email">Amount</label>
              {amountClasses.includes("invalid") && (
                <small className="helper-text invalid">Email</small>
              )}
            </div>
            <p>
              <label>
                <input type="checkbox" onChange={accessHandler} />
                <span>{translate(user.language, "AcceptRules")}</span>
              </label>
            </p>
          </div>
          <div className="card-action">
            <div>
              <button
                className="btn waves-effect waves-light auth-submit"
                type="submit"
              >
                {translate(user.language, "Register")}
                <i className="material-icons right">send</i>
              </button>
            </div>

            <p className="center">
              {translate(user.language, "HasAccount")}
              <NavLink to="/login">
                {translate(user.language, "Login")}!
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  authenticate,
  setToast,
};

export default connect(
  (state: any) => ({ user: state.user }),
  mapDispatchToProps
)(Register);
