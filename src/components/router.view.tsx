import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from './Register'
import HOComponent from "./HOC";

function RouterView(props: any) {
  return (
    <Switch>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/register" exact component={Register} />
      <Route path="/" component={(props:any) => {
        return <HOComponent {...props} toLoad="Home" />
      }}></Route>      
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
