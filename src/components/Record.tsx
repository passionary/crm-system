import React, { useState, useEffect, useRef } from "react";

export const Record = ({ categories }: any) => {
  setTimeout(() => {
    M.FormSelect.init(document.querySelector("#category-list") as any);
  }, 0);
  const [type, setType] = useState('');
  const category = useRef<HTMLSelectElement>(null)
  useEffect(() => {
    console.log(type,category.current);
  }, [type,category]);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const curCategory = category.current!.children[category.current!.selectedIndex] as any
    
    e.preventDefault()
    const body = {
      category: curCategory.value,
      category_id: curCategory.id,
      type,
      amount: document.querySelector<HTMLInputElement>('#amount')!.value,
      description: document.querySelector<HTMLInputElement>('#description')!.value
    }
    console.log(body);
    
    fetch('http://127.0.0.1:8000/api/create-record', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.text())
    .then(res => {
      console.log(res);
      
      
    })
    
  }

  return (
    <>
      <div className="page-title">
        <h3>Новая запись</h3>
      </div>

      <form onSubmit={submitHandler} className="form" id="record-create">
        <div className="input-field">
          <select id="category-list" name="category" ref={category}>
            {categories.map((cat: any) => (
              <option key={cat.id} id={cat.id}>{cat.name}</option>
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
