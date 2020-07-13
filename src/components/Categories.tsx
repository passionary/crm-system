import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { translate } from "../filters/translate";
import { setToast } from "../actions";

const Categories = ({
  categories,
  createCategory,
  editCategory,
  user,
  setToast,
}: any) => {
  setTimeout(() => {
    M.FormSelect.init(document.querySelector("#category-list") as any);
  }, 0);
  const createSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = document.getElementById("create");
    fetch("http://127.0.0.1:8000/api/create-category", {
      method: "POST",
      body: new FormData(form as any),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setToast(Object.values(res.errors)[0]);
          return;
        }
        setToast(translate(user.language, "Category_HasBeenCreated"));
        createCategory(res);
      })
      .catch((e) => setToast(translate(user.language, "CatchError")));
  };
  const editSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = document.getElementById("edit");
    fetch("http://127.0.0.1:8000/api/edit-category", {
      method: "POST",
      body: new FormData(form as any),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setToast(Object.values(res.errors)[0]);
          return;
        }
        setToast(translate(user.language, "Category_HasBeenUpdated"));
        editCategory(res);
      })
      .catch((e) => setToast(translate(user.language, "CatchError")));
  };
  return (
    <>
      <div className="page-title">
        <h3>{translate(user.language, "Menu_Categories")}</h3>
      </div>
      <section>
        <div className="row">
          <div className="col s12 m6">
            <div>
              <div className="page-subtitle">
                <h4>{translate(user.language, "Create")}</h4>
              </div>

              <form onSubmit={createSubmitHandler} id="create">
                <div className="input-field">
                  <input name="name" id="name" type="text" />
                  <label htmlFor="name">
                    {translate(user.language, "Title")}
                  </label>
                  <span className="helper-text invalid">
                    {translate(user.language, "Message_CategoryTitle")}
                  </span>
                </div>
                <input
                  name="user_id"
                  type="hidden"
                  id="user_id"
                  value={user && user.id}
                />
                <div className="input-field">
                  <input name="limit" id="limit" type="number" />
                  <label htmlFor="limit">
                    {translate(user.language, "Limit")}
                  </label>
                  <span className="helper-text invalid">
                    {translate(user.language, "Message_MinLength")}
                  </span>
                </div>

                <button className="btn waves-effect waves-light" type="submit">
                  {translate(user.language, "Create")}
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
          </div>
          <div className="col s12 m6">
            <div>
              <div className="page-subtitle">
                <h4>{translate(user.language, "Edit")}</h4>
              </div>

              <form onSubmit={editSubmitHandler} id="edit">
                <div className="input-field">
                  <select name="id" id="category-list">
                    {categories &&
                      categories.length &&
                      categories.map((cat: any, index: number) => (
                        <option key={index} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                  <label>{translate(user.language, "SelectCategory")}</label>
                </div>
                <input
                  name="user_id"
                  type="hidden"
                  value={user && user.id}
                />
                <div className="input-field">
                  <input name="name" type="text" id="name" />
                  <label htmlFor="name">
                    {translate(user.language, "Title")}
                  </label>
                  <span className="helper-text invalid">
                    {translate(user.language, "Title")}
                  </span>
                </div>

                <div className="input-field">
                  <input name="limit" id="limit" type="number" />
                  <label htmlFor="limit">
                    {translate(user.language, "Limit")}
                  </label>
                  <span className="helper-text invalid">
                    {translate(user.language, "Limit")}
                  </span>
                </div>

                <button className="btn waves-effect waves-light" type="submit">
                  {translate(user.language, "Update")}
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  setToast,
};

export default connect(
  (state: any) => ({ ...state }),
  mapDispatchToProps
)(Categories);
