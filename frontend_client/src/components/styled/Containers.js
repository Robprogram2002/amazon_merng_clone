import styled, { css } from "styled-components";
import colors from "../../constants/colors";

export const Divcenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
`;

export const DivDouble = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  grid-gap: 0rem;
  margin: 1rem;
  border: 8px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  max-height: 100vh;
  max-width: 100%;
  overflow: hidden;
  border-radius: 12px;
  ${(props) =>
    props.border &&
    css`
      ${"" /* border: 1px solid #707070; */}
      box-shadow: -1px 2px 3px 2px rgba(0,0,0,.3)
    `};
`;

export const DivIconField = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 100%;
  grid-gap: 0rem;
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`;

export const DivContainer = styled.div`
  padding: 1rem;
  border-radius: 12px;

  ${(props) =>
    props.shadow &&
    css`
      box-shadow: -1px -2px 1px 0.8px #cecdcd, 1px 2px 1px 0.8px #cecdcd;
    `}

  ${(props) =>
    props.border &&
    css`
      border: 1px solid ${colors.darkBlue};
    `};

  ${(props) =>
    props.height & props.width &&
    css`
      height: ${props.height}%;
      width: ${props.width}%;
    `}
`;

export const DivColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
`;
