import React, { useRef } from "react";
import { connect } from "react-redux";
import { translate } from '../filters/translate'

const Profile = ({ user, initUser, language, setLocale }: any) => {
  const username = useRef<HTMLInputElement>(null);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocale(language === 'en' ? 'ru' : 'en')
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(
      `http://127.0.0.1:8000/api/change-name?id=${user.id}&username=${
        username.current!.value
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        initUser(res);
      });
  };
  setTimeout(() => {
    M.updateTextFields();
  }, 0);
  return (
    <>
      <div className="page-title">
        <h3>{translate(language,'ProfileTitle')}</h3>
      </div>

      <form className="form" onSubmit={submitHandler}>
        <div className="input-field">
          <input id="description" type="text" ref={username} />
          <label htmlFor="description">{translate(language,'Name')}</label>
          <span className="helper-text invalid">name</span>
        </div>
        <div className="switch" style={{marginBottom: '2rem'}}>
          <label>
            English
            <input type="checkbox" onChange={changeHandler} />
            <span className="lever"></span>
            Русский
          </label>
        </div>
        <button className="btn waves-effect waves-light" type="submit">
          {translate(language,'Update')}
          <i className="material-icons right">send</i>
        </button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  initUser: (user: any) => {
    return {
      type: "init-user",
      payload: user,
    };
  },
  setLocale: (lang: string) => {
    return {
      type: 'set-locale',
      payload: lang
    }
  }
};

export default connect(
  (state: any) => ({ ...state }),
  mapDispatchToProps
)(Profile);
