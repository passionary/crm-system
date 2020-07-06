import React from "react";

export const Record = () => {
  return (
    <>
      <div className="page-title">
        <h3>Новая запись</h3>
      </div>

      <form className="form">
        <div className="input-field">
          <select>
            <option>name cat</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <p>
          <label>
            <input
              className="with-gap"
              name="type"
              type="radio"
              value="income"
            />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
              className="with-gap"
              name="type"
              type="radio"
              value="outcome"
            />
            <span>Расход</span>
          </label>
        </p>

        <div className="input-field">
          <input id="amount" type="number" />
          <label htmlFor="amount">Сумма</label>
          <span className="helper-text invalid">amount пароль</span>
        </div>

        <div className="input-field">
          <input id="description" type="text" />
          <label htmlFor="description">Описание</label>
          <span className="helper-text invalid">description пароль</span>
        </div>

        <button className="btn waves-effect waves-light" type="submit">
          Создать
          <i className="material-icons right">send</i>
        </button>
      </form>
    </>
  );
};
