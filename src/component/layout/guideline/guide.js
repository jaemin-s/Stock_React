import React, { useEffect, useState } from "react";
import "./guide.scss";
import "../../bootstrap/css/sb-admin-2.min.css";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GuideSideBar from "./GuideSideBar";
import GuideContent from "./GuideContent";
const Guide = ({}) => {
  const [topButton, setTopButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setTopButton(true);
    } else {
      setTopButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div id="page-top" style={{ width: "80%" }}>
        <div id="wrapper">
          <GuideSideBar />
          <GuideContent />
          {topButton && (
            <button className="top-button" onClick={scrollToTop}>
              <FontAwesomeIcon icon={faUpLong} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Guide;
