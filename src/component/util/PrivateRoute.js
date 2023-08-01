import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authenticated, Component }) => {
  return authenticated ? (
    Component
  ) : (
    <Navigate to="/" {...alert("접속 할 수 없는 페이지 입니다.")} />
  );
};

export default PrivateRoute;
