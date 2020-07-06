import React from "react";
import RouterView from "./components/router.view";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { Categories } from "./components/Categories";
export function App() {
  return (
    <BrowserRouter>      
      <RouterView />      
    </BrowserRouter>
  );
}

export default App;
