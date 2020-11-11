import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const RegisterForm = ({
  initialSingUpValues,
  registerSchema,
  history,
  setLogin,
}) => {
  return (
    <Formik
      initialValues={initialSingUpValues}
      validateOnBlur={true}
      validationSchema={registerSchema}
      onSubmit={(values, actions) => {
        if (values.password !== values.confimPassword) {
          return alert("the password must match");
        } else {
          //envias los datos al servidor y rediriges a login
          history.push("/login");

          setLogin(true);
        }
      }}
    >
      {(formikProps) => (
        <Form autoComplete="Off">
          <div>
            <div>
              {/* <AccountCircleOutlinedIcon color="action" fontSize="default" /> */}
            </div>
            <div>
              <Field
                type="text"
                name="userName"
                placeholder="Your user name ..."
              />
            </div>
          </div>
          <ErrorMessage name="userName" component="span" />
          <div>
            <div>
              <div>
                {/* <AccountCircleOutlinedIcon color="action" fontSize="default" /> */}
              </div>
              <div>
                <Field type="email" name="email" placeholder="Email" />
              </div>
            </div>
          </div>
          <ErrorMessage name="email" component="span" />
          <div>
            <div>
              {/* <AccountCircleOutlinedIcon color="action" fontSize="default" /> */}
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
            </div>
          </div>
          <ErrorMessage name="password" component="span" />
          <div>
            <div>
              {/* <AccountCircleOutlinedIcon color="action" fontSize="default" /> */}
            </div>
            <div>
              <Field
                type="password"
                name="confimPassword"
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <ErrorMessage name="confimPassword" component="span" />
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

export default RegisterForm;
