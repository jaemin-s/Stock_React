import React, { useEffect, useState } from "react";
import DoughnutMaker from "./DoughnutMaker";
import { API_BASE_URL } from "../../../config/host-config";
import BarChart from "./VerticalBarChart";

const UserByMBTI = () => {
  const [mbtiUser, setMbtiUser] = useState();
  const [mbtiAvgUser, setMbtiAvgUser] = useState();

  async function getMbtiUser() {
    const res = await fetch(API_BASE_URL + "/api/user/mbtiuser");
    if (res.status === 200) {
      const data = await res.json();
      const labels = [];
      const doughnutData = [];
      data.forEach((item) => {
        labels.push(item.mbti);
        doughnutData.push(item.count);
      });
      setMbtiUser({
        labels: labels,
        doughnutLabel: "유저수",
        doughnutData: doughnutData,
      });
    }
  }

  async function getMbtiAvg() {
    const res = await fetch("http://localhost:8181/api/user/mbtiprofit");
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      const items = [];
      data.forEach((item) => {
        items.push({
          label: item.mbti,
          value: [item.profit],
        });
      });
      setMbtiAvgUser(items);
    }
  }

  useEffect(() => {
    getMbtiUser();
    getMbtiAvg();
  }, []);

  return (
    <section className="stats-by-MBTI admin-stats">
      <h1 className="h3 text-gray-800 stats-header">MBTI</h1>
      <div className="stats-body">
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                MBTI별 유저 수
              </h6>
            </div>
            <div className="card-body">
              <DoughnutMaker
                labels={!!mbtiUser && mbtiUser.labels}
                doughnutLabel={!!mbtiUser && mbtiUser.doughnutLabel}
                doughnutData={!!mbtiUser && mbtiUser.doughnutData}
              />
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                MBTI별 평균 손익
              </h6>
            </div>
            <div className="card-body profit-body">
              <BarChart barLabel={["평균 손익"]} items={mbtiAvgUser} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserByMBTI;
