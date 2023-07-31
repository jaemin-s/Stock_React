import React, { useState } from "react";
import UserByMBTI from "./stats/UserByMBTI";
import "./UserStats.scss";
import UserGroupByCareer from "./stats/UserGroupByCareer";

const UserStats = () => {
  return (
    <>
      <UserByMBTI />
      <UserGroupByCareer />
    </>
  );
};

export default UserStats;
