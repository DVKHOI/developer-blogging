import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";

const HomePageStyles = styled.div``;
const HomePage = ({ children }) => {
  useEffect(() => {
    console.log("object");
  });
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <Outlet></Outlet>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
