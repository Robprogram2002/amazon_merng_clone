import React from "react";
import styled, { css } from "styled-components";
import { Divcenter } from "../../components/styled/Containers";
import colors from "../../constants/colors";

const IconStyled = styled.i`
  color: ${(props) => (props.color ? props.color : colors.mainOrange)};
  width: auto;
  font-weight: bold;
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `};
`;

const Icon = ({ icon_name, color }) => {
  return (
    <Divcenter height={25} width={25}>
      <IconStyled className={icon_name} color={color} />
    </Divcenter>
  );
};

export default Icon;
