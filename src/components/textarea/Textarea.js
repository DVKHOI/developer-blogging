import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    padding: ${(props) =>
      props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
    outline: none;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    width: 100%;
    font-weight: 500;
    border: 1px solid transparent;
    transition: all 0.2s linear;
    resize: none;
    min-height: 100px;
  }
  textarea::-webkit-input-placeholder {
    color: #84878b;
  }
  textarea::-moz-input-placeholder {
    color: #84878b;
  }
  textarea:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <TextareaStyles hasIcon={children ? true : false}>
      <textarea id={name} type={type} {...field} {...props} />
      {children ? <div className="input-icon">{children}</div> : null}
    </TextareaStyles>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  control: PropTypes.object,
  children: PropTypes.node,
};
export default Textarea;
