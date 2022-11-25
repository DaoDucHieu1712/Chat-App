import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  color: ${(props) => props.theme.blackMain};
  font-weight: 500;
`;

const Label = ({ htmlFor, labelContent }) => {
  return <LabelStyles htmlFor={htmlFor}>{labelContent}</LabelStyles>;
};

export default Label;
