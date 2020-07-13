import React from "react";
import { getCookie } from "../utils/cookie";
import { connect } from "react-redux";
import Home from "./Home";
import { Loader } from "./RootLoader";
import { initUser } from '../actions'
import Login from "./Login";

// interface IComponents {
//   [key: string]: any;
// }
// const components: IComponents = {
//   Home: (props:any) => <Home {...props} />,
// };
interface IState {
  logout: boolean;
}

interface IProps {
  toLoad: string;
  initUser?:any;
  children?: any;
  token?: string;
  logout?: any;
  isLoading?: boolean;
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
      return <Login />;
    }
    if (this.props.isLoading) {
      return <Loader />;
    }
    if (this.props.token === getCookie("token")) {
      return <Home {...this.props} />;
    } else {
      return <Login />;
    }
  }
  componentWillMount() {
    this.props.loading();
  }
  componentDidMount() {
    fetch(`http://127.0.0.1:8000/api/token?token=${getCookie("token")}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          this.props.breakLoader();
        }, 1000);

        if (data && data.api_token) {
          this.props.setToken(data.api_token);
          this.props.initUser(data)
        }
      })
      .catch((e) => {
        this.props.breakLoader();
      });
  }
  componentWillUnmount() {
    console.log("some");
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
  breakLoader: any;
  initUser: any;
}
const breakLoader = () => {
  return (dispatch: any) => {
    dispatch({
      type: "break-loading",
    });
  };
};
const loading = () => {
  return (dispatch: any) => {
    dispatch({
      type: "loading",
    });
  };
};
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
  initUser,
  breakLoader,
};
const mapStateToProps = (state: any) => ({
  ...state,
});
export default connect(mapStateToProps, mapDispatchToProps)(HOComponent);
