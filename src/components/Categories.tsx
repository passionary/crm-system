import React from "react";

export const Categories = (props: any) => {
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

              <form>
                <div className="input-field">
                  <input id="name" type="text" />
                  <label htmlFor="name">Название</label>
                  <span className="helper-text invalid">Введите название</span>
                </div>

                <div className="input-field">
                  <input id="limit" type="number" />
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

              <form>
                <div className="input-field">
                  <select>
                    <option>Category</option>
                  </select>
                  <label>Выберите категорию</label>
                </div>

                <div className="input-field">
                  <input type="text" id="name" />
                  <label htmlFor="name">Название</label>
                  <span className="helper-text invalid">TITLE</span>
                </div>

                <div className="input-field">
                  <input id="limit" type="number" />
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
