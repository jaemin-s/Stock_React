import React from "react";

const NotFound = () => {
  return (
    <div class="container-fluid">
      <div class="text-center">
        <div class="error mx-auto" data-text="404">
          404
        </div>
        <p class="lead text-gray-800 mb-5">Page Not Found</p>
        <p class="text-gray-500 mb-0">페이지를 찾을 수 없습니다.</p>
        <a href="/">← 메인화면으로 돌아가기</a>
      </div>
    </div>
  );
};

export default NotFound;
