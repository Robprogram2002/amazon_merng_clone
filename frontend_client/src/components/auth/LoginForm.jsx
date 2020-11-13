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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      email
      token
      userId
      imageUrl
    }
  }
`;

const LoginForm = ({
  initialLoginValues,
  loginSchema,
  loginFunction,
  history,
  setIsLogin,
}) => {
  const [errors, setErrors] = useState();
  const [loginGraph, { loading }] = useMutation(LOGIN_QUERY, {
    onError: (err) => setErrors(err.graphQLErrors[0]),
    onCompleted: async (data) => {
      await loginFunction(data.login, data.login.token);
      history.push("/");
    },
  });

  errors && alert(errors);

  return (
    <Divcenter>
      <DivContainer shadow={true} height={70} width={70}>
        <Title>Login</Title>
        <Formik
          initialValues={initialLoginValues}
          validateOnBlur={true}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            console.log("the function is running");
            // loginFunction({ email: values.email, password: values.password });
            loginGraph({ variables: values });
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
                  height={22}
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
                <ErrorMessage name="email" component="span" />
                <DivField
                  height={22}
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
                  className={Class.Error}
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
