import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/auth-context";

import { Navbar, Container, Nav } from "react-bootstrap";
import { Button } from "../button";
import coding from "../../image/coding.png";
const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  z-index: 100 !important;
  .logo {
    max-width: 60px;
    display: block;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 40px;
    list-style: none;
    text-decoration: none;
    margin-left: 40px;
    font-weight: 500;
    transition: all 0.25s;
    &.active,
    &:hover {
      color: ${(props) => props.theme.primary} !important;
    }
  }

  @media screen and (max-width: 992px) {
    .menu {
      margin-left: 0;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 40px;
    }
  }

  .navbar-toggler-icon {
    background-color: gray;
    border-radius: 4px;
  }
  .header-auth {
    display: flex;
    align-items: center;
  }
`;
const menu = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Performance",
    url: "performance",
  },
  {
    name: "Typescrip",
    url: "typescrip",
  },
  {
    name: "React",
    url: "react",
  },
  {
    name: "Re-renders",
    url: "re-renders",
  },
  {
    name: "Composition",
    url: "composition",
  },
];
function getLastName(name) {
  if (!name) return "User";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}
const Header = () => {
  const { userInfo } = useAuth();

  return (
    <HeaderStyles>
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="text-center bg-white header vw-100"
        >
          <Container>
            <Navbar.Brand href="/">
              <img
                srcSet={coding}
                alt=""
                className="logo animate__animated animate__lightSpeedInLeft"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className=" me-auto">
                {menu.map((menu) => {
                  if (menu.name === "Home") {
                    return (
                      <NavLink
                        key={menu.name}
                        className="menu animate__animated animate__lightSpeedInLeft"
                        to="/"
                      >
                        Home
                      </NavLink>
                    );
                  } else {
                    return (
                      <NavLink
                        key={menu.name}
                        className="menu animate__animated animate__lightSpeedInLeft"
                        to={`/category/${menu.url}`}
                      >
                        {menu.name}
                      </NavLink>
                    );
                  }
                })}
              </Nav>
              <Nav>
                <div className="header-info animate__animated animate__lightSpeedInRight">
                  {!userInfo ? (
                    <Button
                      height="56px"
                      className="header-button "
                      to="/login"
                    >
                      Login
                    </Button>
                  ) : (
                    <div className="header-auth animate__animated animate__lightSpeedInRight">
                      <span>Welcome </span>
                      <strong className="pl-2 cursor-pointer text-primary">
                        <Link to="/profile">
                          {getLastName(userInfo?.fullname)}
                        </Link>
                      </strong>
                      <Button
                        className="w-[100px] ml-4"
                        height="40px"
                        to="/dashboard"
                      >
                        Dashboard
                      </Button>
                    </div>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    </HeaderStyles>
  );
};
export default Header;
