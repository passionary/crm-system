import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const Categories = ({categories, createCategory, editCategory}: any) => {
  const [load, setLoad] = useState(false)  
  
  // const [current, setCurrent] = useState()  
  
  setTimeout(() => {M.FormSelect.init(document.querySelector('#category-list') as any)},0)
  const createSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = document.getElementById('create')
    fetch('http://127.0.0.1:8000/api/create-category',{
      method: 'POST',
      body: new FormData(form as any)
    })
    .then(res => res.json())
    .then(res => {
      createCategory(res)
      setLoad(true)
    })
  }
  const editSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = document.getElementById('edit')
    fetch('http://127.0.0.1:8000/api/edit-category',{
      method: 'POST',
      body: new FormData(form as any)
    })
    .then(res => res.json())
    .then(res => {
      editCategory(res)
      
      // createCategory(res)
      // setLoad(true)
    })
  }
  // function selectChangeHandler(this:any,e: React.ChangeEvent<HTMLSelectElement>) {
  //   const option = e.target.children[e.target.selectedIndex]    
    
  //   setCurrent(categories.find((c:any) => c.id == option.id))    
  // }
  return (
    <>
      <div className="page-title">
        <h3>Категории</h3>
      </div>
      <section>
        <div className="row">
          <div className="col s12 m6">
            <div>
              <div className="page-subtitle">
                <h4>Создать</h4>
              </div>

              <form onSubmit={createSubmitHandler} id="create">
                <div className="input-field">
                  <input name="name" id="name" type="text" />
                  <label htmlFor="name">Название</label>
                  <span className="helper-text invalid">Введите название</span>
                </div>

                <div className="input-field">
                  <input name="limit" id="limit" type="number" />
                  <label htmlFor="limit">Лимит</label>
                  <span className="helper-text invalid">
                    Минимальная величина
                  </span>
                </div>

                <button className="btn waves-effect waves-light" type="submit">
                  Создать
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
          </div>
          <div className="col s12 m6">
            <div>
              <div className="page-subtitle">
                <h4>Редактировать</h4>
              </div>

              <form onSubmit={editSubmitHandler} id="edit">
                <div className="input-field">
                  <select name="id" id="category-list">
                    {categories && categories.length && categories.map((cat:any,index:number) => <option key={index} value={cat.id}>{cat.name}</option>)}
                  </select>
                  <label>Выберите категорию</label>
                </div>

                <div className="input-field">
                  <input name="name" type="text" id="name" />
                  <label htmlFor="name">Название</label>
                  <span className="helper-text invalid">TITLE</span>
                </div>

                <div className="input-field">
                  <input name="limit" id="limit" type="number" />
                  <label htmlFor="limit">Лимит</label>
                  <span className="helper-text invalid">LIMIT</span>
                </div>

                <button className="btn waves-effect waves-light" type="submit">
                  Обновить
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
  fetchServerData: (data: any) => {
    return {
      type: 'fetchServerData',
      payload: data
    }
  }
}

export default connect((state:any) => ({...state}), mapDispatchToProps)(Categories)