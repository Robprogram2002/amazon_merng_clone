import React from "react";
import { useField } from "formik";
import styled from "styled-components";

const InputStyled = styled.input`
  outline: none;
  border: none;
  height: 100%;
  margin: 0;
  color: #333333;
  font-weight: bold;
  font-family: "Roboto", sans-serif;

  ::placeholder {
    font-weight: normal;
  }
`;

const SpanError = styled.span`
  color: rgb(218, 7, 7);
  font-size: 1rem;
  font-style: italic;
  font-family: "Lobster", sans-serif;
  text-align: center;
  padding: 0;
  margin: 0;
`;

export const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <InputStyled className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <SpanError className="error">{meta.error}</SpanError>
      ) : null}
    </>
  );
};

export const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox">
        <InputStyled type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <SpanError className="error">{meta.error}</SpanError>
      ) : null}
    </div>
  );
};

export const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <InputStyled {...field} {...props} />
      {meta.touched && meta.error ? (
        <SpanError className="error">{meta.error}</SpanError>
      ) : null}
    </div>
  );
};
