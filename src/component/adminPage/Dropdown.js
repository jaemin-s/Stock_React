import React, { useState } from 'react';

const Dropdown = ({ toggleHandler }) => {

  const [isToggle, setIsToggle] = useState(false);
  
  const handleToggle = () => {
    setIsToggle(!isToggle);
    toggleHandler();
    console.log(isToggle);
  };

  return (
    <ul className="navbar-nav" >
      <li className={isToggle ? "nav-item dropdown no-arrow show" : "nav-item dropdown no-arrow"} onClick={handleToggle}>
        <a
          className={isToggle ? "nav-link dropdown-toggle slide-up" : "nav-link dropdown-toggle slide-down"}
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={isToggle ? "true" : "false"}
        >
          <span style={{ fontWeight: 600, fontSize: 20 }}>
            &nbsp;
            <span className={isToggle ? "rotate-up" : "rotate-down"}>
              {isToggle ? "↩" : "↪"}
            </span>
          </span>
        </a>


        <div
          className={isToggle ? "dropdown-menu dropdown-menu-right shadow animated--grow-in show" : "dropdown-menu dropdown-menu-right shadow animated--grow-in"}
          aria-labelledby="userDropdown" style={{width: 1, margin: 0, position:'absolute'}}
        >
          <li className="dropdown-item">
            <a className="nav-link" href="javascript:void(0);">
              등급관리
            </a>
          </li>
          <hr className="border-line" />
          <li className="dropdown-item">
            <a className="nav-link" href="javascript:void(0);" >
              정보관리
            </a>
          </li>
          <hr className="border-line" />
          <li className="dropdown-item">
            <a className="nav-link" href="javascript:void(0);" >
              포인트 관리
            </a>
          </li>
        </div>
      </li>
    </ul>
  );
};

export default Dropdown;