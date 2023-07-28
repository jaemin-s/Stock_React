import React from "react";
import { Doughnut } from "react-chartjs-2";
import DoughnutMaker from "./DoughnutMaker";

const UserByMBTI = () => {
  return (
    <section className="stats-by-MBTI admin-stats">
      <h1 class="h3 text-gray-800 stats-header">MBTI</h1>
      <div className="stats-body">
        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">MBTI별 유저 수</h6>
            </div>
            <div class="card-body">
              <DoughnutMaker />
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">
                MBTI별 평균 손익
              </h6>
            </div>
            <div class="card-body">
              <DoughnutMaker />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserByMBTI;
