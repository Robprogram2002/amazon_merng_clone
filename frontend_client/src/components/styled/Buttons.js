import fonts from "../../constants/fonts";

const { default: styled } = require("styled-components");

export const SimpleButton = styled.button`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.Color};
  background-color: ${(props) => props.background};
  border-radius: 12px;
  padding: ${(props) => props.padding}rem;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-family: ${fonts.cursive};
  margin: ${(props) => props.margin}rem;
  cursor: pointer;
  position: relative;

  :hover {
    text-transform: scale(1.05);
    opacity: 0.9;
  }
`;
