import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LableStyles = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: 600;
  line-height: 30px;
  cursor: pointer;
`;
const Lable = ({ htmlFor = "", children, props }) => {
  return (
    <LableStyles htmlFor={htmlFor} {...props}>
      {children}
    </LableStyles>
  );
};
Lable.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.string.isRequired,
};
export default Lable;
