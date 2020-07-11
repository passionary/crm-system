import React, { useEffect, useState } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Bill from "./Bill";
import Categories from "./Categories";
import { History } from "./History";
import Planning from "./Planning";
import Record from "./Record";
import { Preview } from "./Preview";
import { Profile } from "./Profile";
import LoadedComponent from './LoadedComponent'
import { getCookie } from "../cookie";
import { useDispatch } from "react-redux";
import { DetailRecord } from "./DetailRecord";

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
  { to: "/", innerText: "Счет" },
  { to: "/history", innerText: "История" },
  { to: "/planning", innerText: "Планирование" },
  { to: "/new-record", innerText: "Новая запись" },
  { to: "/categories", innerText: "Категории" },
];

const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: (props:any) => {
      return (<LoadedComponent {...props} component={Bill} url={`http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER}&symbols=KZT,USD,EUR`} toDefine={[['rates','rates'],['date','date']]} initial={{rates:{},date:'',base:0}} />)
    }
  },
  {
    path: "/history",
    exact: true,
    component: (props:any) => {
      return <LoadedComponent {...props} component={History} url="http://127.0.0.1:8000/api/history" toDefine={[['records','records'],['categories','categories']]} initial={{records:[], categories:[]}} />
    }
  },
  {
    path: "/planning",
    exact: true,
    component: (props:any) => {
      return <LoadedComponent {...props} component={Planning} url="http://127.0.0.1:8000/api/categories" toDefine={[['categories','']]} initial={{categories:[]}} />
    }
  },
  {
    path: "/new-record",
    exact: true,
    component: (props:any) => {
      return <LoadedComponent {...props} component={Record} url="http://127.0.0.1:8000/api/categories" toDefine={[['categories','']]} initial={{categories:[]}} />
    }
  },
  {
    path: "/record/:id",
    exact: true,
    component: ({match}:any) => {      
      
      const url = `http://127.0.0.1:8000/api/record?id=${match.params && match.params.id}`
      return <LoadedComponent {...match}  component={DetailRecord} url={url} toDefine={[['record','']]} initial={{record:{}}} />
    }
  },
  {
    path: "/categories",
    exact: true,
    component: (props:any) => {
      return <LoadedComponent {...props } component={Categories} url="http://127.0.0.1:8000/api/categories" toDefine={[['categories','']]} initial={{categories:[]}} />
    }
  },
  {
    path: "/profile",
    exact: true,
    component: Profile
  },
];

export const Home = (props: any) => {
  let interval: any;
  
  const dateOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  const [date, setDate] = useState(new Intl.DateTimeFormat('ru-RU',dateOptions).format(new Date()));
  const [user, setUser] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {});
    // interval = setInterval(() => {
    //   setDate(new Intl.DateTimeFormat('ru-RU',dateOptions).format(new Date()))
    // },1000);
    fetch(`http://127.0.0.1:8000/api/user?token=${getCookie('token')}`)
    .then(res => res.json())
    .then(res => {      
      dispatch({
        type: 'init-bill',
        payload: res.bill
      })
      setUser(res)
    })
    return () => {
      clearInterval(interval);
    };
  }, []);
  const [open, setOpen] = useState(true);

  const [logout, setLogout] = useState(false);

  const [full, setFull] = useState(false);

  const logoutHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    props.logout();
    setLogout(true);
  };
  const navbarClasses: string[] = ["sidenav", "app-sidenav"];
  const appContentClasses: string[] = ["app-content"];

  if (open) navbarClasses.push("open");
  if (full) appContentClasses.push("full");

  const menuOpenHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    setOpen(!open);
    setFull(!full);
  };
  if (logout) return <Preview />;
  return (
    <div>
      <div className="app-main-layout">
        <nav className="navbar orange lighten-1">
          <div className="nav-wrapper">
            <div className="navbar-left">
              <a href="/" onClick={menuOpenHandler}>
                <i className="material-icons black-text">dehaze</i>
              </a>
              <span className="black-text">{date}</span>
            </div>

            <ul className="right hide-on-small-and-down">
              <li>
                <a
                  className="dropdown-trigger black-text"
                  href="/"
                  data-target="dropdown"
                >   
                {user && user.username}             
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

        <ul className={navbarClasses.join(" ")}>
          {links.map((link: ILink, index: number) => (
            <li
              className={props.location.pathname === link.to ? "active" : ""}
              key={index}
            >
              <NavLink
                to={link.to}
                className="waves-effect waves-orange pointer"
                key={index + "-nav-link"}
              >
                {link.innerText}
              </NavLink>
            </li>
          ))}
        </ul>
        <main className={appContentClasses.join(" ")}>
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
