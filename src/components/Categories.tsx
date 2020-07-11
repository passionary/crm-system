import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { translate } from "../filters/translate";

const Categories = ({categories, createCategory, editCategory, language}: any) => {
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
        <h3>{translate(language,'Menu_Categories')}</h3>
      </div>
      <section>
        <div className="row">
          <div className="col s12 m6">
            <div>
              <div className="page-subtitle">
                <h4>{translate(language,'Create')}</h4>
              </div>

              <form onSubmit={createSubmitHandler} id="create">
                <div className="input-field">
                  <input name="name" id="name" type="text" />
                  <label htmlFor="name">{translate(language,'Title')}</label>
                  <span className="helper-text invalid">{translate(language,'Message_CategoryTitle')}</span>
                </div>

                <div className="input-field">
                  <input name="limit" id="limit" type="number" />
                  <label htmlFor="limit">{translate(language,'Limit')}</label>
                  <span className="helper-text invalid">
                  {translate(language,'Message_MinLength')}
                  </span>
                </div>

                <button className="btn waves-effect waves-light" type="submit">
                {translate(language,'Create')}
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
          </div>
          <div className="col s12 m6">
            <div>
              <div className="page-subtitle">
                <h4>{translate(language,'Edit')}</h4>
              </div>

              <form onSubmit={editSubmitHandler} id="edit">
                <div className="input-field">
                  <select name="id" id="category-list">
                    {categories && categories.length && categories.map((cat:any,index:number) => <option key={index} value={cat.id}>{cat.name}</option>)}
                  </select>
                  <label>{translate(language,'SelectCategory')}</label>
                </div>

                <div className="input-field">
                  <input name="name" type="text" id="name" />
                  <label htmlFor="name">{translate(language,'Title')}</label>
                  <span className="helper-text invalid">{translate(language,'Title')}</span>
                </div>

                <div className="input-field">
                  <input name="limit" id="limit" type="number" />
                  <label htmlFor="limit">{translate(language,'Limit')}</label>
                  <span className="helper-text invalid">{translate(language,'Limit')}</span>
                </div>

                <button className="btn waves-effect waves-light" type="submit">
                {translate(language,'Update')}
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