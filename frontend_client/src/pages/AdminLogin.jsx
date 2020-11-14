import React, { useContext } from "react";
import LoginForm from "../components/auth/LoginForm";
import { Divcenter } from "../components/styled/Containers";
import * as Yup from "yup";
import { authFunctContext } from "../store/AuthContext";

const initialLoginValues = {
  email: "",
  password: "",
};

const loginSchema = Yup.object({
  email: Yup.string().required("Email is a required field").email(),
  password: Yup.string().required("Passsword is a required field").min(8),
});

const AdminLogin = (props) => {
  const { login } = useContext(authFunctContext);

  return (
    <Divcenter>
      <Divcenter height={450} width={800}>
        <LoginForm
          initialLoginValues={initialLoginValues}
          loginSchema={loginSchema}
          loginFunction={login}
          history={props.history}
          admin={true}
        />
      </Divcenter>
    </Divcenter>
  );
};

export default AdminLogin;
