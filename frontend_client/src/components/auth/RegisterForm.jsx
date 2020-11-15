import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Divcenter,
  DivColumn,
  DivContainer,
  DivIconField,
} from "../styled/Containers";
import { DivField, Title } from "../styled/Form";
import Icon from "../layout/Icon";
import { SimpleButton } from "../styled/Buttons";
import colors from "../../constants/colors";
import Class from "./Login.module.css";
import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`;

const RegisterForm = ({ initialSingUpValues, registerSchema, setIsLogin }) => {
  const [errors, setErrors] = useState();

  const [register, { loading }] = useMutation(REGISTER, {
    update: (_, __) => setIsLogin(true),
    onError: (err) => setErrors(err.graphQLErrors[0]),
    onCompleted: (data) => console.log(data),
  });

  errors && alert(errors);
  // const registerFunction = (userData, e) => {
  //   e.preventDefault();
  // };

  const handleRegister = (e, values, formErrors) => {
    e.preventDefault();

    if (values.password !== values.confimPassword) {
      formErrors("confirmPassword", "The passwords must match");
    } else {
      console.log(values);
      register({ variables: values });
      setIsLogin(true);
    }
  };

  return (
    <Divcenter>
      <DivContainer shadow={true} height={85} width={70}>
        <Title>Register</Title>
        <Formik
          initialValues={initialSingUpValues}
          validateOnBlur={true}
          validationSchema={registerSchema}
          onSubmit={(values, actions) => {
            console.log("najksnjd jsshqwue");
            if (values.password !== values.confirmPassword) {
              actions.setFieldError(
                "confirmPassword",
                "The passwords must match"
              );
              actions.setSubmitting(true);
            } else {
              console.log(values);
              register({ variables: values });
              setIsLogin(true);
            }
          }}
        >
          {(formikProps) => (
            <Form autoComplete="Off" className={Class.Form}>
              <DivColumn center={true}>
                <DivField
                  height={28}
                  // error={formikProps.errors.username ? true : false}
                  error={
                    formikProps.errors.username && formikProps.touched.username
                      ? true
                      : false
                  }
                >
                  <DivIconField>
                    <Icon icon_name="far fa-envelope" />
                    <Field
                      type="text"
                      name="username"
                      placeholder="Your username ..."
                      className={Class.Field}
                    />
                  </DivIconField>
                </DivField>
                <ErrorMessage
                  name="username"
                  component="span"
                  className={Class.ErrorMessege}
                />

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
                  height={26}
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
                <DivField
                  height={26}
                  error={
                    formikProps.errors.confirmPassword &&
                    formikProps.touched.confirmPassword
                      ? true
                      : false
                  }
                >
                  <DivIconField>
                    <Icon icon_name="fas fa-key" />
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className={Class.Field}
                    />
                  </DivIconField>
                </DivField>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={Class.ErrorMessege}
                />

                <DivColumn>
                  <p
                    className={Class.Paragraph}
                    onClick={() => setIsLogin(true)}
                  >
                    Are you already have an account ? Login now !
                  </p>
                  <Divcenter>
                    <SimpleButton
                      type="submit"
                      // disabled={formikProps.errors.keys ? false : true}
                      onClick={() => {
                        if (formikProps.errors === {}) {
                          handleRegister(
                            this,
                            formikProps.values,
                            formikProps.setErrors
                          );
                        } else {
                          return;
                        }
                      }}
                      color={colors.darkBlue}
                      background={colors.mainOrange}
                      // padding={0.6}
                      width={200}
                      height={40}
                    >
                      {loading ? "Loading ..." : "Submit"}
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

export default RegisterForm;
