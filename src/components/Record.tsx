import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";

const Record = ({ categories, bill, initBill }: any) => {
  setTimeout(() => {
    M.FormSelect.init(document.querySelector("#category-list") as any);
  }, 0);
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const category = useRef<HTMLSelectElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const curCategory = category.current!.children[
      category.current!.selectedIndex
    ] as any;
    const amount = document.querySelector<HTMLInputElement>("#amount")!.value;
    e.preventDefault();
    const body = {
      category_id: curCategory.id,
      type,
      amount,
      description: document.querySelector<HTMLInputElement>("#description")!
        .value,
    };

    fetch("http://127.0.0.1:8000/api/create-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        
        const billUrl = `http://127.0.0.1:8000/api/set-bill?id=${bill.id}&type=${type}&amount=${amount}`;        
        
        fetch(billUrl)
          .then((res) => res.json())
          .then((res) => {
            initBill(res.bill)
          });
      });
  };

  return (
    <>
      <div className="page-title">
        <h3>Новая запись</h3>
      </div>

      <form onSubmit={submitHandler} className="form" id="record-create">
        <div className="input-field">
          <select id="category-list" name="category" ref={category}>
            {categories.map((cat: any) => (
              <option key={cat.id} id={cat.id}>
                {cat.name}
              </option>
            ))}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setType(e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setType(e.target.value)
              }
            />
            <span>Расход</span>
          </label>
        </p>

        <div className="input-field">
          <input name="amount" id="amount" type="number" />
          <label htmlFor="amount">Сумма</label>
          <span className="helper-text invalid">amount пароль</span>
        </div>

        <div className="input-field">
          <input name="description" id="description" type="text" />
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

const mapDispatchToProps = {
  initBill: (bill:any) => ({
    type: 'init-bill',
    payload: bill
  })
}
export default connect((state: any) => ({ bill: state.bill }),mapDispatchToProps)(Record);
