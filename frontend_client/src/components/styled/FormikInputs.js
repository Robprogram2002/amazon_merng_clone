import React from "react";
import { useField } from "formik";
import styled, { css } from "styled-components";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const InputStyled = styled.input`
  outline: none;
  padding-left: 0.6rem;
  border: 1px solid #757474;
  margin: 0;
  border-radius: 10px;
  color: #333333;
  font-weight: bold;
  font-family: ${fonts.regularFont};
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}%;
  ::placeholder {
    font-weight: normal;
  }
  ${(props) =>
    props.error &&
    css`
      border: 1px solid ${colors.errorMessege};
    `}
`;

export const SpanError = styled.span`
  color: ${colors.errorMessege};
  font-size: 1rem;
  letter-spacing: 0.8px;
  font-family: ${fonts.cursive};
  text-align: center;
  padding: 0;
  margin: 0;
`;

export const LabelForm = styled.label`
  font-family: ${fonts.cursive};
  font-size: ${(props) => (props.font ? props.font : 1.4)}rem;
  letter-spacing: 1px;
  padding: 0.4rem;
`;

export const LoadImage = styled.img`
  width: 90%;
  height: 90%;
  max-width: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  margin: ${(props) => props.margin}rem 0rem;
  ${(props) =>
    props.maxHeight &&
    css`
      max-height: ${props.maxHeight}px;
      max-width: ${props.maxWidth}px;
    `}
`;

export const UploadFileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const UploadFileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${colors.darkBlue};
  background-color: ${colors.darkBlue};
  color: ${colors.mainOrange};
  font-size: 1;
  font-family: ${fonts.regularFont};
  text-transform: uppercase;
  padding: 0.4rem;
  height: 40px;
  width: 100px;
  cursor: pointer;
  transition: 0.1s ease-in all;

  &:hover {
    transform: scale(1.05);
  }
`;

export const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      {label && (
        <LabelForm htmlFor={props.id || props.name} font={props.font}>
          {label}
        </LabelForm>
      )}
      <InputStyled
        className="text-input"
        {...field}
        {...props}
        // error={props.error}
      />
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
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <SpanError className="error">{meta.error}</SpanError>
      ) : null}
    </div>
  );
};

export const MyNumberInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      {label && (
        <LabelForm htmlFor={props.id || props.name} font={props.font}>
          {label}
        </LabelForm>
      )}
      <InputStyled
        className="number-input"
        {...field}
        {...props}
        // error={props.error}
      />
      {meta.touched && meta.error ? (
        <SpanError className="error">{meta.error}</SpanError>
      ) : null}
    </div>
  );
};
