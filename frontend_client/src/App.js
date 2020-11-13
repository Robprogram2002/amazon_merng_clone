import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { authContext } from "./store/AuthContext";
import AuthRoutes from "./AuthRoutes";
import Home from "./pages/Home";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      username
      email
      token
      userId
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

  if (!authState.userToken) {
    return <AuthRoutes />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Home user={userData} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
