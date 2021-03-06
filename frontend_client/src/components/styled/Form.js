import styled, { css } from "styled-components";
import colors from "../../constants/colors";
import fonts from "../../constants/fonts";

export const DivField = styled.div`
  border: 1px solid #cecdcd;
  border-radius: 12px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem;
  margin: 0;
  margin-top: 1rem;
  height: ${(props) => props.height}px;

  ${(props) =>
    props.error === true &&
    css`
      border: 1px solid #ff0000;
    `}
  ${(props) =>
    props.align &&
    css`
      align-items: ${props.align};
    `}
`;

export const Title = styled.h3`
  font-family: ${fonts.cursive};
  font-size: ${(props) => (props.size ? props.size : 2.6)}rem;
  letter-spacing: 2px;
  color: ${(props) => (props.color ? props.color : colors.mainOrange)};
  text-align: center;
  margin: 0;
  margin-bottom: 0.6rem;
  padding: 0rem;
`;
