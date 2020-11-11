import React, { useState, useContext } from "react";
import * as Yup from "yup";
import { authFunctContext } from "../store/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import LoginIlustartion from "../components/auth/LoginIlustartion";
import RegisterForm from "../components/auth/RegisterForm";

const registerSchema = Yup.object({
  userName: Yup.string()
    .required("The user name is required")
    .min(3, "The user name must have aleats 3 characters"),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  confimPassword: Yup.string().required("The confirm password is required"),
});
const loginSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
});

const LoginPage = (props) => {
  const { login } = useContext(authFunctContext);
  const [isLogin, setIsLogin] = useState(true);

  const initialSingUpValues = {
    userName: "",
    email: "",
    password: "",
    confimPassword: "",
  };

  const initialLoginValues = {
    email: "",
    password: "",
  };

  if (isLogin) {
    return (
      <div className="">
        <div className="">
          <LoginForm
            initialLoginValues={initialLoginValues}
            loginSchema={loginSchema}
            loginFunction={login}
            history={props.history}
          />
        </div>
        <div className="">
          <LoginIlustartion />
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="">
          <RegisterForm
            history={props.history}
            initialSingUpValues={initialSingUpValues}
            setLogin={setIsLogin}
            registerSchema={registerSchema}
          />
        </div>
        <div className="">
          <LoginIlustartion />
        </div>
      </div>
    );
  }
};

export default LoginPage;
