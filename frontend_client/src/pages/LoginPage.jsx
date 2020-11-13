import React, { useState, useContext } from "react";
import * as Yup from "yup";
import { authFunctContext } from "../store/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import LoginIlustration from "../components/auth/LoginIlustration";
import { DivDouble, Divcenter } from "../components/styled/Containers";

const registerSchema = Yup.object({
  username: Yup.string()
    .required("The user name is required")
    .min(3, "The user name must have aleats 3 characters"),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string().required("The confirm password is required"),
});
const loginSchema = Yup.object({
  email: Yup.string().required("Email is a required field").email(),
  password: Yup.string().required("Passsword is a required field").min(8),
});

const LoginPage = (props) => {
  const { login } = useContext(authFunctContext);
  const [isLogin, setIsLogin] = useState(true);

  const initialSingUpValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialLoginValues = {
    email: "",
    password: "",
  };

  return (
    <Divcenter>
      <DivDouble border={true} height={400} width={940}>
        {isLogin ? (
          <>
            <LoginIlustration login={isLogin} />
            <LoginForm
              initialLoginValues={initialLoginValues}
              loginSchema={loginSchema}
              loginFunction={login}
              history={props.history}
              setIsLogin={setIsLogin}
            />
          </>
        ) : (
          <>
            <RegisterForm
              history={props.history}
              initialSingUpValues={initialSingUpValues}
              setIsLogin={setIsLogin}
              registerSchema={registerSchema}
            />
            <LoginIlustration login={isLogin} />
          </>
        )}
      </DivDouble>
    </Divcenter>
  );
};

export default LoginPage;
