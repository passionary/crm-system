import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

const Register = (props: any) => {
  const [auth, setAuth] = useState(false);
  let email = useRef<HTMLInputElement>(null);
  let password = useRef<HTMLInputElement>(null);
  let name = useRef<HTMLInputElement>(null);
  const [emailClasses, setEmailClass] = useState(["validate"]);
  const [passwordClasses, setPasswordClass] = useState(["validate"]);
  const [nameClasses, setnameClass] = useState(["validate"]);
  const [access, setAccess] = useState(false)

  useEffect(() => {
    M.updateTextFields();
  }, []);
  const accessHandler = (e: React.ChangeEvent<HTMLInputElement>) => {    
    setAccess(!access)
  }
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
    setnameClass(['validate']);
    if(!access) {
      props.setToast("You need access our rules")
      return false
    }
    const form = document.querySelector("#form");

    if (!form) return;
    fetch("http://127.0.0.1:8000/api/registr", {
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
              <label htmlFor="password">Пароль</label>
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
              <label htmlFor="name">Имя</label>
              {nameClasses.includes("invalid") && (
                <small className="helper-text invalid">Name</small>
              )}
            </div>
            <p>
              <label>
                <input type="checkbox" onChange={accessHandler} />
                <span>С правилами согласен</span>
              </label>
            </p>
          </div>
          <div className="card-action">
            <div>
              <button
                className="btn waves-effect waves-light auth-submit"
                type="submit"
              >
                Зарегистрироваться
                <i className="material-icons right">send</i>
              </button>
            </div>

            <p className="center">
              Уже есть аккаунт?
              <NavLink to="/login">Войти!</NavLink>
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
const setToast = (message:string) => {
  return (dispatch: any) => {
    dispatch({
      type: 'set-toast',
      payload: message
    })
    M.toast({html: message})
  }  
}
const mapDispatchToProps = {
  auth,
  setToast
};

export default connect(null, mapDispatchToProps)(Register);
