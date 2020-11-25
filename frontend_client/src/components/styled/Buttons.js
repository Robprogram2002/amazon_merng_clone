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
  font-size: 1.15rem;
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

export const TransparentButton = styled.button`
  outline: none;
  background-color: transparent;
  color: ${(props) => props.color};
  border: 1px solid
    ${(props) => (props.borderColor ? props.borderColor : props.color)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-family: ${(props) => (props.font ? props.font : fonts.regularFont)};
  padding: 0.4rem;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border-radius: 12px;
  margin: 1.5rem 1rem;
  cursor: pointer;
  &:hover {
    transform: scaleZ(1.1);
    font-weight: bold;
    border: 2px solid
      ${(props) => (props.borderColor ? props.borderColor : props.color)};
  }
`;
