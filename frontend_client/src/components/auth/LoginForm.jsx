import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const LoginForm = ({
  initialLoginValues,
  loginSchema,
  loginFunction,
  history,
}) => {
  return (
    <Formik
      initialValues={initialLoginValues}
      validateOnBlur={true}
      validationSchema={loginSchema}
      onSubmit={(values, actions) => {
        console.log("the function is running");
        loginFunction({ email: values.email, password: values.password });
        history.push("/");
      }}
    >
      {(formikProps) => (
        <Form autoComplete="Off">
          <div>
            <div>
              {/* <AccountCircleOutlinedIcon color="action" fontSize="default" /> */}
            </div>
            <div>
              <Field type="email" name="email" placeholder="Your email ..." />
            </div>
          </div>
          <ErrorMessage name="email" component="span" />
          <div>
            <div>
              {/* <AccountCircleOutlinedIcon color="action" fontSize="default" /> */}
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Your password ..."
              />
            </div>
          </div>
          <ErrorMessage name="password" component="span" />
          <div>
            {/* <Button
              // type="submit"
              // disabled={formikProps.isSubmitting}
              onClick={() => formikProps.handleSubmit()}
              color="primary"
              variant="contained"
              size="large"
              startIcon={<SendIcon />}
              className={Classes.SubmitButton}
            >
              Submit
            </Button> */}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
