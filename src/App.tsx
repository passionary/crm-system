import React from "react";
import RouterView from "./components/router.view";
import { BrowserRouter } from "react-router-dom";
export function App() {
  return (
    <BrowserRouter>      
      <RouterView />      
    </BrowserRouter>
  );
}

export default App;
