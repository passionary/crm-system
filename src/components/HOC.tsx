import React from "react";
import { getCookie } from "../cookie";
import { connect } from "react-redux";
import { Todos } from "./Todos";
import { Home } from "./Home";
import { Preview } from "./Preview";

interface IComponents {
  [key: string]: any;
}
const components: IComponents = {
  Todos: (props:any) => <Todos {...props} />,
  Home: (props:any) => <Home {...props} />,
};
interface IState {
  logout: boolean;
}

interface IProps {
  toLoad: string;
  children?:any;
  token?: string;
  logout?: any;
  isLoading?:boolean;
  loading?: any;
  breakLoader?: any;
  setToken?: any;
}

class HOComponent extends React.Component<IProps, IState> {
  state: IState = {
    logout: false,
  };

  constructor(props: any) {            
    super(props);
  }

  render() {    
    if (this.state.logout) {
      return <Preview />
    }
    if(this.props.isLoading) {
      return (
        <div className="lds-dual-ring"></div>
      )
    }
    if(this.props.token === getCookie("token")) {
      if(this.props.toLoad === 'Home') {
        return (
          <Home>
            {this.props.children}
          </Home>
        )        
      }
      return (
        <>
          {/* <button onClick={() => this.logout()}>logout</button> */}
          {components[this.props.toLoad](this.props)}
        </>
      )
    }else {
      return (
        <Preview />
      );
    }    
  }
  componentWillMount() {
    this.props.loading()
  }
  componentDidMount() {    
    fetch(`http://127.0.0.1:8000/api/token?token=${getCookie("token")}`)
      .then((res) => res.json())
      .then((data) => {
        this.props.breakLoader()
        
        if (data && data.token) {
          this.props.setToken(data.token);
        }
      });
  }
  logout() {
    this.setState({ logout: true });
    this.props.logout();
  }
}

interface IMap {
  logout: any;
  setToken: any;
  loading: any;
  breakLoader:any;
}
const breakLoader = () => {
  return (dispatch: any) => {
    dispatch({
      type: 'break-loading'
    })
  }
}
const loading = () => {
  return (dispatch: any) => {
    dispatch({
      type: 'loading'
    })
  }
}
function logout() {
  return async (dispatch: any) => {
    try {
      const request = await fetch(
        `http://127.0.0.1:8000/api/logout?token=${getCookie("token")}`
      );
      await request.json();

      dispatch({
        type: "logout",
      });
    } catch (e) {}
  };
}

const setToken = (token: string) => {
  return (dispatch: any) => {
    dispatch({
      type: "set-token",
      payload: token,
    });
  };
};
const mapDispatchToProps: IMap = {
  logout,
  setToken,
  loading,
  breakLoader
};
const mapStateToProps = (state: any) => ({
  ...state,
});
export default connect(mapStateToProps, mapDispatchToProps)(HOComponent);
