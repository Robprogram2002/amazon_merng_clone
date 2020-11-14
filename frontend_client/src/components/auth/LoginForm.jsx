import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Icon from "../layout/Icon";
import { DivColumn, DivIconField } from "../styled/Containers";
import { Divcenter, DivContainer } from "../styled/Containers";
import Class from "./Login.module.css";
import { SimpleButton } from "../../components/styled/Buttons";
import { DivField, Title } from "../styled/Form";
import colors from "../../constants/colors";
import { gql, useMutation } from "@apollo/client";

const LOGIN_QUERY = gql`
  mutation login($email: String!, $password: String!, $type: String) {
    login(email: $email, password: $password, type: $type) {
      username
      email
      token
      userId
      imageUrl
      type
    }
  }
`;

const LoginForm = ({
  initialLoginValues,
  loginSchema,
  loginFunction,
  history,
  setIsLogin,
  admin,
}) => {
  const [errors, setErrors] = useState();
  const [loginGraph, { loading }] = useMutation(LOGIN_QUERY, {
    onError: (err) => setErrors(err.graphQLErrors),
    onCompleted: async (data) => {
      await loginFunction(data.login, data.login.token);
      history.push("/");
    },
  });

  errors && console.log(errors);

  return (
    <Divcenter>
      <DivContainer shadow={true} height={85} width={70}>
        <Title> {admin ? "Admin Login" : "Login"} </Title>
        <Formik
          initialValues={initialLoginValues}
          validateOnBlur={true}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            console.log("the function is running");
            // loginFunction({ email: values.email, password: values.password });
            // if (admin === true) {
            //   loginFunction({ variables: { ...values, type: "admin" } });
            // } else {
            if (admin === true) {
              loginGraph({ variables: { ...values, type: "admin" } });
              history.pish("/admin/deshboard");
            } else {
              loginGraph({ variables: { ...values, type: "customer" } });
            }
            // }
          }}
        >
          {(formikProps) => (
            <Form
              autoComplete="Off"
              className={Class.Form}
              onSubmit={formikProps.handleSubmit}
            >
              <DivColumn center={true}>
                <DivField
                  height={28}
                  error={
                    formikProps.errors.email && formikProps.touched.email
                      ? true
                      : false
                  }
                >
                  <DivIconField>
                    <Icon icon_name="far fa-envelope" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your email ..."
                      className={Class.Field}
                    />
                  </DivIconField>
                </DivField>
                <ErrorMessage
                  name="email"
                  component="span"
                  className={Class.ErrorMessege}
                />
                <DivField
                  height={28}
                  error={
                    formikProps.errors.password && formikProps.touched.password
                      ? true
                      : false
                  }
                >
                  <DivIconField>
                    <Icon icon_name="fas fa-key" />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Your password ..."
                      className={Class.Field}
                    />
                  </DivIconField>
                </DivField>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={Class.ErrorMessege}
                />

                <DivColumn>
                  <p
                    className={Class.Paragraph}
                    onClick={() => setIsLogin(false)}
                  >
                    Are you still not have an account ? Register now !
                  </p>
                  <Divcenter>
                    <SimpleButton
                      type="submit"
                      // onClick={() => formikProps.handleSubmit()}
                      color={colors.darkBlue}
                      background={colors.mainOrange}
                      padding={0.6}
                      width={200}
                      height={40}
                      margin={1}
                    >
                      Submit
                    </SimpleButton>
                  </Divcenter>
                </DivColumn>
              </DivColumn>
            </Form>
          )}
        </Formik>
      </DivContainer>
    </Divcenter>
  );
};

export default LoginForm;
