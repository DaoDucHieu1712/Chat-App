import React from "react";
import styled from "styled-components";

const ButtonStyles = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.primary};
  color: #fff;
  padding: 13px;
  font-weight: 500;
  &:hover {
    opacity: 0.9;
  }
`;

const Button = ({ type, buttonContent, ...props }) => {
  return (
    <ButtonStyles type={type} {...props}>
      {buttonContent}
    </ButtonStyles>
  );
};

export default Button;
