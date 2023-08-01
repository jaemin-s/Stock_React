import React, { useEffect, useState } from "react";
import DoughnutMaker from "./DoughnutMaker";
import BarChart from "./VerticalBarChart";

const UserGroupByCareer = () => {
  const [careerUser, setCareerUser] = useState();
  const [careerAvgUser, setCareerAvgUser] = useState();

  async function getCareerUser() {
    const res = await fetch("http://localhost:8181/api/user/careeruser");
    if (res.status === 200) {
      const data = await res.json();
      const labels = [];
      const doughnutData = [];
      data.forEach((item) => {
        if (item.career == 1) {
          labels.push("입문");
        } else if (item.career == 2) {
          labels.push("1~3년");
        } else if (item.career == 3) {
          labels.push("4~10년");
        } else if (item.career == 4) {
          labels.push("10년 이상");
        } else {
          labels.push("경력 체크 안함");
        }
        doughnutData.push(item.count);
      });
      setCareerUser({
        labels: labels,
        doughnutLabel: "유저 수",
        doughnutData: doughnutData,
      });
    }
  }

  async function getCareerAvgUser() {
    const res = await fetch("http://localhost:8181/api/user/careerprofit");
    if (res.status === 200) {
      const data = await res.json();
      const items = [];
      data.forEach((item) => {
        if (item.career == 1) {
          items.push({
            label: "입문",
            value: [item.profit],
          });
        } else if (item.career == 2) {
          items.push({
            label: "1~3년",
            value: [item.profit],
          });
        } else if (item.career == 3) {
          items.push({
            label: "4~10년",
            value: [item.profit],
          });
        } else if (item.career == 4) {
          items.push({
            label: "10년 이상",
            value: [item.profit],
          });
        } else {
          items.push({
            label: "경력 미입력",
            value: [item.profit],
          });
        }
      });
      setCareerAvgUser(items);
    }
  }

  useEffect(() => {
    getCareerUser();
    getCareerAvgUser();
  }, []);

  return (
    <section className="stats-by-MBTI admin-stats">
      <h1 className="h3 text-gray-800 stats-header">경력</h1>
      <div className="stats-body">
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                경력 별 유저 수
              </h6>
            </div>
            <div className="card-body">
              <DoughnutMaker
                labels={!!careerUser && careerUser.labels}
                doughnutLabel={!!careerUser && careerUser.doughnutLabel}
                doughnutData={!!careerUser && careerUser.doughnutData}
              />
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                경력 별 평균 손익
              </h6>
            </div>
            <div className="card-body profit-body">
              <BarChart barLabel={["평균 손익"]} items={careerAvgUser} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserGroupByCareer;
