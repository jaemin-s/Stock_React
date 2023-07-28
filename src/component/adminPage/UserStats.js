import React, { useState } from "react";
import UserByMBTI from "./stats/UserByMBTI";
import "./UserStats.scss";
import UserGroupByAge from "./stats/UserGroupByAge";
import UserGroupByCareer from "./stats/UserGroupByCareer";

const UserStats = () => {
  return (
    <>
      <UserByMBTI />
      <UserGroupByAge />
      <UserGroupByCareer />
    </>
  );
};

export default UserStats;
