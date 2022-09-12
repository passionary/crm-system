import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { translate } from "../filters/translate";
import { setToast } from "../actions";
import firebase from "firebase";

const Record = ({ categories, bill, initBill, setToast, user }: any) => {
  console.log(categories, 'CATEGORIES RECORD');
  const categoryRef = useRef<HTMLSelectElement>(null);
  
  setTimeout(() => {
    M.FormSelect.init(document.querySelector("#category-list") as any);
  }, 0);
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {    
    e.preventDefault();
    
    const uid = firebase.auth().currentUser!.uid;
    const curCategory = categoryRef.current!.children[
      categoryRef.current!.selectedIndex
    ] as any;
    const categoryId = curCategory.id;
    const amount = document.querySelector<HTMLInputElement>("#amount")!.value;
    const description = document.querySelector<HTMLInputElement>("#description")!.value;
    const instance = await firebase.database().ref(`users/${uid}/records`).push({
      categoryId, categoryTitle: curCategory.value, type, amount, description
    });
    

    console.log(curCategory.id, "CATEGORY REF");

    const body = {
      type,
      amount,
      description: document.querySelector<HTMLInputElement>("#description")!
        .value,
    };
    if (bill && type === "outcome" && bill.bill < amount) {
      setToast(translate(user.language, "NotEnoughMoney"));
      return;
    }
    fetch("http://127.0.0.1:8000/api/create-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res: any) => {
        console.log(res);
        
        if (res.errors) {
          setToast(Object.values(res.errors)[0]);
          return;
        }
        setToast(translate(user.language, "RecordHasBeenCreated"));
        const billUrl = `http://127.0.0.1:8000/api/set-bill?id=${bill.id}&type=${type}&amount=${amount}`;

        fetch(billUrl)
          .then((res) => res.json())
          .then((res) => {
            initBill(res.bill);
          });
      })
      .catch((e) => setToast(translate(user.language, "CatchError")));
  };

  return (
    <>
      <div className="page-title">
        <h3>{translate(user.language, "Menu_NewRecord")}</h3>
      </div>

      <form onSubmit={submitHandler} className="form" id="record-create">
        <div className="input-field">
          <select ref={categoryRef} id="category-list" name="category">
            {categories.map((cat: any) => (
              <option key={cat.id} id={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
          <label>{translate(user.language, "SelectCategory")}</label>
        </div>
        <input name="user_id" type="hidden" id="user_id" value={user && user.id} />
        <p>
          <label>
            <input
              className="with-gap"
              name="type"
              type="radio"
              value="income"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setType(e.target.value)
              }
            />            
            <span>{translate(user.language, "Income")}</span>
          </label>
        </p>

        <p>
          <label>
            <input
              className="with-gap"
              name="type"
              type="radio"
              value="outcome"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setType(e.target.value)
              }
            />
            <span>{translate(user.language, "Outcome")}</span>
          </label>
        </p>

        <div className="input-field">
          <input name="amount" id="amount" type="number" />
          <label htmlFor="amount">{translate(user.language, "Amount")}</label>
          <span className="helper-text invalid">amount пароль</span>
        </div>

        <div className="input-field">
          <input name="description" id="description" type="text" />
          <label htmlFor="description">
            {translate(user.language, "Description")}
          </label>
          <span className="helper-text invalid">description пароль</span>
        </div>

        <button className="btn waves-effect waves-light" type="submit">
          {translate(user.language, "Create")}
          <i className="material-icons right">send</i>
        </button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  setToast,
  initBill: (bill: any) => ({
    type: "init-bill",
    payload: bill,
  }),
};
export default connect(
  (state: any) => ({ ...state }),
  mapDispatchToProps
)(Record);
