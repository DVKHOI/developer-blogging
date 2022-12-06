import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../image/coding.png";
const PageNotFoundStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    margin-bottom: 40px;
    width: 150px;
  }
  .heading {
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 20px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    border-radius: 8px;
    color: #fff;
    background-color: ${(props) => props.theme.primary};
    font-weight: 500;
  }
`;
const PageNotFound = () => {
  return (
    <PageNotFoundStyles>
      <NavLink to="/">
        <img srcSet={logo} alt="Developerway-blogging" className="logo" />
      </NavLink>
      <h1 className="heading">Oops! Page bot found</h1>
      <NavLink to="/" className="back">
        Back to home
      </NavLink>
    </PageNotFoundStyles>
  );
};

export default PageNotFound;
