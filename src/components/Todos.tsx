import React from "react";
import { NavLink, Route } from "react-router-dom";

const Todos = ({ match }: any) => {
  console.log(match);

  return (
    <>
      <h1>This is a todos!</h1>
      <NavLink to="/">Home</NavLink>
      <br />
      <NavLink to="/todos/some">somes</NavLink>
      <Route
        path="/todos/some"
        exact={true}
        render={({ match }: any) => <h1>some</h1>}
      ></Route>
    </>
  );
};

export { Todos };
