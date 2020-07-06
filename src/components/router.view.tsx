import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import HOComponent from "./HOC";
import { Home } from "./Home";
import { Categories } from "./Categories";
import { Bill } from "./Bill";

interface IData {
  token?: string;
}
const routes: any[] = [
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
function RouterView(props: any) {
  return (
    <Switch>
      <Route path="/login" exact component={Login} key="logining"></Route>

      <Route path="/" component={() => {
        return <HOComponent toLoad="Home" />
      }}></Route>
      {/* <HOComponent toLoad="Home">
        <Route
          exact          
          component={() => {
            return (
              <>
                {routes.map((route: any,index:number) => {
                  return <Route {...route} key={index}></Route>;
                })}
              </>
            );
          }}
        ></Route>
      </HOComponent> */}
    </Switch>
  );
}

const mapDispatchToProps = {
  logout: () => {
    return {
      type: "logout",
    };
  },
};

export default connect(null, mapDispatchToProps)(RouterView);
