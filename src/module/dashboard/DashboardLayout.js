import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/auth-context";
import PageNotFound from "../../pages/PageNotFound";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
  @media screen and (max-width: 768px) {
    .dashboard {
      &-main {
        display: grid;
        grid-template-columns: 100px minmax(0, 1fr);
        padding: 20px 10px;
        gap: 0 20px;
        align-items: start;
      }
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth();

  if (!userInfo) return <PageNotFound></PageNotFound>;
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
