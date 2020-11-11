import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

let initialState = {
  userToken: null,
  userId: null,
};

// const initialFunctContext = {
//   //   signUp: () => {},
//   login: () => {},
//   logout: () => {},
//   //   register: () => {},
// };

export const authContext = createContext();
export const authFunctContext = createContext();

const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);

  if (new Date() > expiresAt) {
    localStorage.removeItem("token");
  } else {
    initialState = {
      userToken: token,
      userId: decodedToken.userId,
    };
  }
} else console.log("No token found");

const AuthProvider = ({ children }) => {
  const authReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          userId: action.userId,
          userToken: action.userToken,
        };
      case "LOGOUT":
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        return initialState;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  const authFunctionsState = {
    login: async (userId, token) => {
      dispatch({
        type: "LOGIN",
        userId,
        userToken: token,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    },

    logout: () => {
      dispatch({
        type: "LOGOUT",
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
