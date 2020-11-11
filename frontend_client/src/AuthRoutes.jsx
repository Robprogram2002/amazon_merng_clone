import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} key="login" />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRoutes;
