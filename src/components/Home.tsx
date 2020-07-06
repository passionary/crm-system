import React, { useEffect } from "react";
import { NavLink, Switch, Route, BrowserRouter } from "react-router-dom";
import { Bill } from "./Bill";
import { Categories } from "./Categories";

interface IRoute {
  path: string;
  exact: boolean;
  component: any;
}

const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: Bill,
  },
  {
    path: "/categories",
    exact: true,
    component: Categories,
  },
];

export const Home = ({match,children}:any) => {
  console.log(children);
  
  useEffect(() => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {});
  }, []);
  return (
    <div>
      <div className="app-main-layout">
        <nav className="navbar orange lighten-1">
          <div className="nav-wrapper">
            <div className="navbar-left">
              <a href="/">
                <i className="material-icons black-text">dehaze</i>
              </a>
              <span className="black-text">12.12.12</span>
            </div>

            <ul className="right hide-on-small-and-down">
              <li>
                <a
                  className="dropdown-trigger black-text"
                  href="/"
                  data-target="dropdown"
                >
                  USER NAME
                  <i className="material-icons right">arrow_drop_down</i>
                </a>

                <ul id="dropdown" className="dropdown-content">
                  <li>
                    <a href="/" className="black-text">
                      <i className="material-icons">account_circle</i>Профиль
                    </a>
                  </li>
                  <li className="divider" tabIndex={-1}></li>
                  <li>
                    <a href="/" className="black-text">
                      <i className="material-icons">assignment_return</i>Выйти
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav app-sidenav open">
          <li>
            <NavLink
              to="/some"
              className="waves-effect waves-orange pointer"
            >
              Счет
            </NavLink>
          </li>
          <li>
            <a href="/" className="waves-effect waves-orange pointer">
              История
            </a>
          </li>
          <li>
            <a href="/" className="waves-effect waves-orange pointer">
              Планирование
            </a>
          </li>
          <li>
            <a href="/" className="waves-effect waves-orange pointer">
              Новая запись
            </a>
          </li>
          <li>
            <a href="/" className="waves-effect waves-orange pointer">
              Категории
            </a>
          </li>
        </ul>
        <main className="app-content">
          <div className="app-page">
            <div>
              <Route path="/" exact component={Bill}></Route>
              <Route path="/categories" exact component={Categories}></Route>              
            </div>
          </div>
        </main>
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large blue" href="/">
            <i className="large material-icons">add</i>
          </a>
        </div>
      </div>
    </div>
  );
};
