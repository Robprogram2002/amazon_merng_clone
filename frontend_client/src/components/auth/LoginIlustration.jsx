import React from "react";
import styled, { css } from "styled-components";
import colors from "../../constants/colors";
import fonts from "../../constants/fonts";
import RegisterIcon from "./RegisterIcon";
import LoginIcon from "./LoginIcon";

const DivContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
  padding: 1rem;
  background-color: ${colors.darkBlue};
`;

const DivTitle = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.maxHeight &&
    css`
      max-height: 100%;
    `}
`;

const CustomH2 = styled.h2`
  font-size: 2.2rem;
  font-family: ${fonts.bigFont};
  letter-spacing: 1.4px;
  color: whitesmoke;
`;

// const CustomImg = styled.img`
//   width: 100%;
//   height: 100%;
//   max-width: 100%;
//   max-height: 100%;
// `;

const LoginIlustration = ({ login }) => {
  return (
    <DivContainer>
      <DivTitle>
        <CustomH2>
          {login
            ? "Welcome Again! New products are waiting for you"
            : "Thousands of products at the best price and quality"}
        </CustomH2>
      </DivTitle>
      <DivTitle maxHeight={true}>
        {login ? <LoginIcon /> : <RegisterIcon />}
      </DivTitle>
    </DivContainer>
  );
};

export default LoginIlustration;
{
  /* "Thousands of products at the best price and with the highest quality"} */
}
