import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import LoginPage from "./pages/LoginPage";

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} key="login" />
        <Route path="/register" exact component={LoginPage} key="register" />
        <Route path="/admin/login" exact component={AdminLogin} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRoutes;
