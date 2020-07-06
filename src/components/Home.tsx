import React, { useEffect, useState } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { Bill } from "./Bill";
import { Categories } from "./Categories";
import { History } from "./History";
import { Planning } from "./Planning";
import { Record } from "./Record";
import { prependOnceListener } from "process";
import { Preview } from "./Preview";
import { link } from "fs";
import { Profile } from "./Profile";

interface IRoute {
  path: string;
  exact: boolean;
  component: any;
}

interface ILink {
  to: string;
  innerText: string;
}
const links: ILink[] = [
  { to: "/", innerText: 'Счет'},
  { to: "/history", innerText: 'История' },
  { to: "/planning", innerText: 'Планирование'},
  { to: "/new-record", innerText: 'Новая запись' },
  { to: "/categories" , innerText: 'Категории'},
];

const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: Bill,
  },
  {
    path: "/history",
    exact: true,
    component: History,
  },
  {
    path: "/planning",
    exact: true,
    component: Planning,
  },
  {
    path: "/new-record",
    exact: true,
    component: Record,
  },
  {
    path: "/categories",
    exact: true,
    component: Categories,
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
  },
];

export const Home = (props: any) => {
  useEffect(() => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {});
  }, []);

  const [logout, setLogout] = useState(false);

  const logoutHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    props.logout();
    setLogout(true);
  };
  console.log(props);
  
  if (logout) return <Preview />;
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
                    <NavLink to="/profile" className="black-text">
                      <i className="material-icons">account_circle</i>Профиль
                    </NavLink>
                  </li>
                  <li className="divider" tabIndex={-1}></li>
                  <li>
                    <a href="/" onClick={logoutHandler} className="black-text">
                      <i className="material-icons">assignment_return</i>Выйти
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav app-sidenav open">
          {links.map((link: ILink, index:number) => (
            <li className={props.location.pathname === link.to ? 'active' : ''} key={index}>
              <NavLink
                to={link.to}                
                className="waves-effect waves-orange pointer"
                key={index + '-nav-link'}
          >{link.innerText}</NavLink>
            </li>
          ))}
        </ul>
        <main className="app-content">
          <div className="app-page">
            <div>
              <Switch>
                {routes.map((route: IRoute, index: number) => (
                  <Route {...route} key={index} />
                ))}
              </Switch>
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
