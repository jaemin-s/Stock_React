import React, { useState } from "react";
import UserByMBTI from "./stats/UserByMBTI";
import "./UserStats.scss";
import UserGroupByCareer from "./stats/UserGroupByCareer";
import UserGroupByAges from "./stats/UserGroupByAges";

const UserStats = () => {
  return (
    <>
      <UserByMBTI />
      <UserGroupByAges />
      <UserGroupByCareer />
    </>
  );
};

export default UserStats;
