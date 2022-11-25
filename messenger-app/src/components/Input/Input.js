import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyles = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid ${(props) => props.theme.gray2};

    &:focus {
      border: 1px solid ${(props) => props.theme.primary};
    }
  }

  input::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  input::-moz-input-placeholder {
    color: #b2b3bd;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .icon-eye {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({
  type = "text",
  name = "",
  children,
  hasIcon = false,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <InputStyles hasIcon={children ? true : false}>
      <input type={type} id={name} {...field} {...props} autoComplete="off" />
      {children}
    </InputStyles>
  );
};

export default Input;
