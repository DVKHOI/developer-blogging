import React, { Fragment } from "react";
import { Footer } from "../../module/home/footer/HomeFooter";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>
      {children}
      <Footer></Footer>
    </Fragment>
  );
};

export default Layout;
