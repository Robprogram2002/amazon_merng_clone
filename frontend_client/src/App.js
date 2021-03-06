import React, { useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
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
      <Route
        path="/admin/deshboard"
        render={(props) => <AdminDeshboard user={userData} {...props} />}
      />
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact render={() => <Home user={userData} />} />
      </Switch>
    );
  }
}

export default App;
