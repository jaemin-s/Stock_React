import React from "react";
import DoughnutMaker from "./DoughnutMaker";

const UserGroupByCareer = () => {
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
              <DoughnutMaker />
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
            <div className="card-body">
              <DoughnutMaker />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserGroupByCareer;
