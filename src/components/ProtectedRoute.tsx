import React, { useEffect, useState } from "react";
import { Route, NavLink, Redirect } from "react-router-dom";
import { getCookie } from "../cookie";
import { connect } from "react-redux";

interface IState {
  logout: boolean;
  token?: string
}
interface IProps {
  path: string,
  exact: boolean,
  token?: string,
  isLogout?: string,
  component: any,
  auth?: any
}
class ProtectedRoute extends React.Component<IProps,IState>{
  state: IState = {
    logout: false,
  };
  constructor(props:any) {    
    super(props);
    this.props.auth()
  }
  render() {
    if (
      this.props.token && 
      getCookie('token') &&
      this.props.token === getCookie('token')
    ) {
      if (this.props.isLogout) {
        return <Redirect to="/login" />;
      }
      return <Route path={this.props.path} component={this.props.component} exact={this.props.exact}></Route>;
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
  async logoutHandler() {
    try {
      const request = await fetch(
        `http://127.0.0.1:8000/api/logout?token=${getCookie("token")}`
      );
      const data = await request.json();
      this.setState({ logout: true });
    } catch (e) {}
  }
}

function authenticate() {
  return async (dispatch:any) => {
    const request = await fetch(
      `http://127.0.0.1:8000/api/token?token=${getCookie("token")}`
    );
    const data = await request.json();
    
    dispatch({
      type: "authenticate",
      payload: data.token
    });
  }  
};
interface IMap {
  auth: any
}
const mapDispatchToProps:IMap = {
  auth: authenticate
};
const mapStateToProps = (state:any) => ({
  ...state
})
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
