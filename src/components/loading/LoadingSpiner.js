import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LoadingStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid white;
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpiner = ({ size = "40px", borderSize = "5px" }) => {
  return <LoadingStyles size={size} borderSize={borderSize}></LoadingStyles>;
};
LoadingSpiner.propTypes = {
  size: PropTypes.string,
  borderSize: PropTypes.string,
};
export default LoadingSpiner;
