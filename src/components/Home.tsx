import React, { useEffect, useState } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import Bill from "./Bill";
import Categories from "./Categories";
import History from "./History";
import Planning from "./Planning";
import Record from "./Record";
import Profile from "./Profile";
import LoadedComponent from './LoadedComponent'
import { getCookie } from "../utils/cookie";
import { useDispatch, connect } from "react-redux";
import DetailRecord from "./DetailRecord";
import { translate } from "../filters/translate";
import Login from "./Login";
import { setToast } from "../actions";

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
  { to: "/", innerText: "Bill" },
  { to: "/history", innerText: "Menu_History" },
  { to: "/planning", innerText: "Menu_Planning" },
  { to: "/new-record", innerText: "Menu_NewRecord" },
  { to: "/categories", innerText: "Menu_Categories" },
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
    component: connect((state:any) => ({...state}))((props:any) => {
      const url = `http://127.0.0.1:8000/api/history?user_id=${props.user && props.user.id}`
      return <LoadedComponent {...props} component={History} url={url} toDefine={[['records','records'],['categories','categories']]} initial={{records:[], categories:[]}} />
    })
  },
  {
    path: "/planning",
    exact: true,
    component: connect((state:any) => ({...state}))((props:any) => {
      const url = `http://127.0.0.1:8000/api/categories?user_id=${props.user && props.user.id}`;
      return <LoadedComponent {...props} component={Planning} url={url} toDefine={[['categories','']]} initial={{categories:[]}} />
    })
  },
  {
    path: "/new-record",
    exact: true,
    component: connect((state:any) => ({...state}))((props:any) => {
      const url = `http://127.0.0.1:8000/api/categories?user_id=${props.user && props.user.id}`;  
      return <LoadedComponent {...props} component={Record} url={url} toDefine={[['categories','']]} initial={{categories:[]}} />
    })
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
    component: connect((state:any) => ({...state}))((props:any) => {      
      const url = `http://127.0.0.1:8000/api/categories?user_id=${props.user && props.user.id}`;  
      return <LoadedComponent {...props } component={Categories} url={url} toDefine={[['categories','']]} initial={{categories:[]}} />
    })
  },
  {
    path: "/profile",
    exact: true,
    component: Profile
  },
];

const Home = ({logout, user, location, setToast }: any) => {  
  let interval: any;
  
  const dateOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }    
  const dispatch = useDispatch()
  useEffect(() => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {});    
    fetch(`http://127.0.0.1:8000/api/user?token=${getCookie('token')}`)
    .then(res => res.json())
    .then(res => {      
      dispatch({
        type: 'init-bill',
        payload: res.bill
      })
      dispatch({
        type: 'init-user',
        payload: res
      })
    })
    return () => {
      clearInterval(interval);
    };
  }, []);
  const [open, setOpen] = useState(true);

  const [slogout, setLogout] = useState(false);

  const [full, setFull] = useState(false);

  const logoutHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setToast(translate(user.language, "Logout"))
    logout();
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
  if (slogout) return <Redirect to="/login" />;
  return (
    <div>
      <div className="app-main-layout">
        <nav className="navbar orange lighten-1">
          <div className="nav-wrapper">
            <div className="navbar-left">
              <a href="/" onClick={menuOpenHandler}>
                <i className="material-icons black-text">dehaze</i>
              </a>
              <span className="black-text">{new Date().toDateString()}</span>
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
                      <i className="material-icons">account_circle</i>{translate(user.language, 'ProfileTitle')}
                    </NavLink>
                  </li>
                  <li className="divider" tabIndex={-1}></li>
                  <li>
                    <a href="/" onClick={logoutHandler} className="black-text">
                      <i className="material-icons">assignment_return</i>{translate(user.language, 'Exit')}
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
              className={location.pathname === link.to ? "active" : ""}
              key={index}
            >
              <NavLink
                to={link.to}
                className="waves-effect waves-orange pointer"
                key={index + "-nav-link"}
              >
                {translate(user.language,link.innerText)}
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
          <NavLink to="/new-record" className="btn-floating btn-large blue" href="/">
            <i className="large material-icons">add</i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  setToast
}
export default connect((state:any) => ({user:state.user}),mapDispatchToProps)(Home)