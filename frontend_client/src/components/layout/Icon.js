import React from "react";
import styled, { css } from "styled-components";
import { Divcenter } from "../../components/styled/Containers";
import colors from "../../constants/colors";

const IconStyled = styled.i`
  color: ${colors.mainOrange};
  font-weight: bold;
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `};
`;

const Icon = ({ icon_name }) => {
  return (
    <Divcenter>
      <IconStyled className={icon_name} />
    </Divcenter>
  );
};

export default Icon;
