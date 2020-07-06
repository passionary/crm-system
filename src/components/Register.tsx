import React from "react";

export const Register = () => {
  return (
    <div>
      <div className="grey darken-1 empty-layout">
        <form className="card auth-card">
          <div className="card-content">
            <span className="card-title">Домашняя бухгалтерия</span>
            <div className="input-field">
              <input id="email" type="text" />
              <label htmlFor="email">Email</label>
              <small className="helper-text invalid">Email</small>
            </div>
            <div className="input-field">
              <input id="password" type="password" className="validate" />
              <label htmlFor="password">Пароль</label>
              <small className="helper-text invalid">Password</small>
            </div>
            <div className="input-field">
              <input id="name" type="text" className="validate" />
              <label htmlFor="name">Имя</label>
              <small className="helper-text invalid">Name</small>
            </div>
            <p>
              <label>
                <input type="checkbox" />
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
              <a href="/">Войти!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
