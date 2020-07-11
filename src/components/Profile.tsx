import React, { useRef } from "react";
import { connect } from "react-redux";

const Profile = ({user, initUser}: any) => {
  const username = useRef<HTMLInputElement>(null)
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch(`http://127.0.0.1:8000/api/change-name?id=${user.id}&username=${username.current!.value}`)
    .then(res => res.json())
    .then(res => {
      
      initUser(res)
    })
  }
  setTimeout(() => {
    M.updateTextFields()
  }, 0)
  return (
    <>
      <div className="page-title">
        <h3>Профиль</h3>
      </div>

      <form className="form" onSubmit={submitHandler}>
        <div className="input-field">
          <input id="description" type="text" ref={username} />
          <label htmlFor="description">Имя</label>
          <span className="helper-text invalid">name</span>
        </div>

        <button className="btn waves-effect waves-light" type="submit">
          Обновить
          <i className="material-icons right">send</i>
        </button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  initUser: (user:any) => {
    return {
      type: 'init-user',
      payload: user
    }
  }
}

export default connect((state:any) => ({...state}),mapDispatchToProps)(Profile)