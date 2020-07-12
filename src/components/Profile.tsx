import React, { useRef } from "react";
import { connect } from "react-redux";
import { translate } from '../filters/translate'
import { setToast } from "../actions";

const Profile = ({ user, initUser, setToast }: any) => {
  const username = useRef<HTMLInputElement>(null);      
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lang = document.querySelector<HTMLInputElement>('#lang')!.checked
    
    fetch(
      `http://127.0.0.1:8000/api/change-name?id=${user.id}&username=${
        username.current!.value
      }&lang=${lang ? 'ru' : 'en'}`
    )
      .then((res) => res.json())
      .then((res) => {
        if(res.errors) {
          setToast(translate(user.language,"Message_EnterName"))
          return
        }
        
        setToast(translate(user.language,"ProfileChange"))
        initUser(res);
      });
  };
  setTimeout(() => {    
    M.updateTextFields();    
  }, 0);
  return (
    <>
      <div className="page-title">
        <h3>{translate(user.language,'ProfileTitle')}</h3>
      </div>

      <form className="form" onSubmit={submitHandler}>
        <div className="input-field">
          <input id="description" type="text" ref={username} />
          <label htmlFor="description">{translate(user.language,'Name')}</label>
          <span className="helper-text invalid">name</span>
        </div>
        <div className="switch" style={{marginBottom: '2rem'}}>
          <label>
            English
            <input type="checkbox" id="lang" />
            <span className="lever"></span>
            Русский
          </label>
        </div>
        <button className="btn waves-effect waves-light" type="submit">
          {translate(user.language,'Update')}
          <i className="material-icons right">send</i>
        </button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  setToast,
  initUser: (user: any) => {
    return {
      type: "init-user",
      payload: user,
    };
  }
};

export default connect(
  (state: any) => ({ ...state }),
  mapDispatchToProps
)(Profile);
