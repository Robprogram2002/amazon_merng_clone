import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { authContext } from "./store/AuthContext";
import AuthRoutes from "./AuthRoutes";
import Home from "./pages/Home";

function App() {
  const authState = useContext(authContext);

  if (!authState.userToken) {
    return <AuthRoutes />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
