import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import LoginPage from "./pages/LoginPage";
import SellerLogin from "./pages/SellerLogin";

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path="/login" exact component={LoginPage} key="login" />
      <Route path="/register" exact component={LoginPage} key="register" />
      <Route path="/login/seller" exact component={SellerLogin} key="seller" />
      <Route path="/admin/login" exact component={AdminLogin} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default AuthRoutes;
