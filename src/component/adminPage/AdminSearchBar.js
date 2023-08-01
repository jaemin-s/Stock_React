import React, { useRef, useState } from "react";

const AdminSearchBar = ({ userInfoSearch }) => {
  const [selectedValue, setSelectedValue] = useState("all");
  const inputRef = useRef();

  const handleChange = (e) => {
    setSelectedValue(e.target.value); // 선택한 옵션의 value 값을 상태로 업데이트
    console.log(e.target.value);
  };

  const Search = ({ size = 25, color = "#fcf9f9" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  //검색창 핸들러
  const searchHandler = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value.trim();
    console.log(inputValue);
    userInfoSearch(inputValue, selectedValue);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <select value={selectedValue} onChange={handleChange}>
        <option value="all">전체</option>
        <option value="name">이름</option>
        <option value="email">이메일</option>
      </select>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form className="search-form-container" onSubmit={searchHandler}>
          <div
            className="input-group input-group-append"
            style={{ width: 280 }}
          >
            <input
              id="searchText"
              type="text"
              className="form-control " //border-0 small
              placeholder="입력해주세요."
              aria-label="Search"
              aria-describedby="basic-addon1"
              ref={inputRef}
            />
            <button className="btn btn-primary searchBtn">
              <i className="fa-solid fa-magnifying-glass"></i>
              <Search />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSearchBar;
