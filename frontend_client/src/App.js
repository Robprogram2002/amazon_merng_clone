import React, { useContext, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { authContext } from "./store/AuthContext";
import AuthRoutes from "./AuthRoutes";
import Home from "./pages/Home";
import { gql, useQuery } from "@apollo/client";
import AdminDeshboard from "./pages/AdminDeshboard";

const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      username
      email
      token
      userId
      type
      imageUrl
    }
  }
`;

function App() {
  const authState = useContext(authContext);
  const [userData, setUserData] = useState({});

  const { loading } = useQuery(GET_USER, {
    variables: { id: localStorage.getItem("userId") },
    onCompleted: (data) => setUserData(data.getUser),
  });
  if (loading) {
    return <h1>la app esta cargando</h1>;
  } else if (!authState.userToken) {
    return <AuthRoutes />;
  } else if (userData.type === "admin") {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login/deshboard"
            render={() => <AdminDeshboard user={userData} />}
            exact
          />
          <Redirect to="/login/deshboard" />
        </Switch>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Home user={userData} />} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
