import React, { useEffect, useState } from "react";
import DoughnutMaker from "./DoughnutMaker";
import BarChart from "./VerticalBarChart";
import { API_BASE_URL } from "../../../config/host-config";

const UserGroupByAges = () => {
  const [agesUser, setAgesUser] = useState();
  const [agesProfit, setAgesProfit] = useState();

  async function getAgesUser() {
    const res = await fetch(API_BASE_URL + "/api/user/agesUser");
    if (res.status === 200) {
      const data = await res.json();
      const labels = [];
      const doughnutData = [];
      data.forEach((item) => {
        labels.push(item.ages);
        doughnutData.push(item.count);
      });
      setAgesUser({
        labels: labels,
        doughnutLabel: "유저수",
        doughnutData: doughnutData,
      });
    }
  }

  async function getAgesProfitUser() {
    const res = await fetch(API_BASE_URL + "/api/user/agesProfit");
    if (res.status === 200) {
      const data = await res.json();
      const items = [];
      data.forEach((item) => {
        items.push({
          label: item.ages,
          value: [item.profit],
        });
      });
      setAgesProfit(items);
    }
  }

  useEffect(() => {
    getAgesUser();
    getAgesProfitUser();
  }, []);
  return (
    <section className="stats-by-ages admin-stats">
      <h1 className="h3 text-gray-800 stats-header">유저 수</h1>
      <div className="stats-body">
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                나이대 별 유저 수
              </h6>
            </div>
            <div className="card-body">
              <DoughnutMaker
                labels={!!agesUser && agesUser.labels}
                doughnutLabel={!!agesUser && agesUser.doughnutLabel}
                doughnutData={!!agesUser && agesUser.doughnutData}
              />
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                나이대 별 평균 손익
              </h6>
            </div>
            <div className="card-body profit-body">
              <BarChart barLabel={["평균 손익"]} items={agesProfit} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserGroupByAges;
