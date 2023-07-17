import React from "react";

const test = () => {
  const research = (e) => {
    console.log(e.target.textContent);
    redirection(`/Detail/${e.target.textContent}`);
  };

  return (
    <body>
      <div className="flex bottom-content">
        <div id="last-box" className="simulated-rank card shadow mb-4">
          <div className="card-header">
            <h6 className="m-0 font-weight-bold text-primary">관련종목 추천</h6>
          </div>
          <div className="card-body">
            <button onClick={research}>카카오페이</button>
            <button onClick={research}>카카오뱅크</button>
            <button onClick={research}>카카오화재</button>
            <button onClick={research}>카카오게임즈</button>
          </div>
        </div>
      </div>
    </body>
  );
};

export default test;
