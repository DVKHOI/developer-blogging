import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard404 = () => {
  return (
    <div>
      <h3>You are not allowed to access this page </h3>
      <NavLink
        to="/dashboard"
        className="inline-block px-6 py-3 mt-3 font-semibold text-white bg-blue-400 rounded-lg"
      >
        Back to dashboard
      </NavLink>
    </div>
  );
};

export default Dashboard404;
