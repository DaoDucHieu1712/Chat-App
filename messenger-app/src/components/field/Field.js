import React from "react";
import styled from "styled-components";

const FieldStyles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 10px;
`;

const Field = ({ children }) => {
  return <FieldStyles>{children}</FieldStyles>;
};

export default Field;
