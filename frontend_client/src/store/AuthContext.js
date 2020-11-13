import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
// import { gql, useLazyQuery } from "@apollo/client";
// import { gql, useLazyQuery } from "@apollo/client";

// const GET_USER = gql`
//   query getUser($id: String!) {
//     getUser(id: $id) {
//       username
//       email
//       token
//       userId
//       imageUrl
//     }
//   }
// `;

let initialState = {
  userId: null,
  userToken: null,
  userData: null,
};

const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);
  if (new Date() > expiresAt) {
    localStorage.removeItem("token");
  } else {
    initialState = {
      userId: decodedToken.userId,
      userToken: token,
      userData: { username: decodedToken.username },
    };
  }
}

export const authContext = createContext();
export const authFunctContext = createContext();

const AuthProvider = ({ children }) => {
  // const [userToken, setUserToken] = useState();
  // const [initialState, setInitialState] = useState({
  //   userId: null,
  //   userToken: null,
  //   userData: null,
  // });

  // const [getUser, { loading, error }] = useLazyQuery(GET_USER, {
  //   onCompleted: (data) => {
  //     setInitialState({
  //       userId: data.getUser.userId,
  //       userData: data.getUser,
  //       userToken: userToken,
  //     });
  //   },
  // });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const expiresAt = new Date(decodedToken.exp * 1000);
  //     if (new Date() > expiresAt) {
  //       localStorage.removeItem("token");
  //     } else {
  //       setUserToken(token);
  //       getUser({ variables: { id: decodedToken.userId } });
  //     }
  //   }
  // }, [getUser]);

  const authReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          userData: action.userData,
          userToken: action.userToken,
          userId: action.userData.userId,
        };
      case "LOGOUT":
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        return initialState;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  const authFunctionsState = {
    login: async (userData, token) => {
      dispatch({
        type: "LOGIN",
        userData,
        userToken: token,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userData.userId);
    },

    logout: () => {
      dispatch({
        type: "LOGOUT",
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  };

  return (
    <authContext.Provider value={authState}>
      <authFunctContext.Provider value={authFunctionsState}>
        {children}
      </authFunctContext.Provider>
    </authContext.Provider>
  );
};

export default AuthProvider;
