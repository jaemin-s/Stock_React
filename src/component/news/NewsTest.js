import React, { useEffect, useState } from "react";
import { N_NEWS_ID, N_NEWS_KEY } from "../../config/apikey";
import { useParams } from "react-router-dom";
import "./NewsTest.scss";

const NewsTest = () => {
  const { value } = useParams();

  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, [value]);

  const requestHeader = {
    "X-Naver-Client-Id": N_NEWS_ID,
    "X-Naver-Client-Secret": N_NEWS_KEY,
  };

  const getNews = async () => {
    const query = { value }.value || "주식";
    // const res = await fetch("/search/news.json?query=" + query + "&sort=sim", {
    //   headers: requestHeader,
    // });
    const res = await fetch(
      "https://kq53e0bc8b.execute-api.ap-northeast-2.amazonaws.com/b2w-api1/navernews/" +
        query +
        ""
    );
    if (res.status === 200) {
      const data = await res.json();
      let values = [];

      data.items.forEach((x) => {
        // const oldTitle = values[0].title;
        const { pubDate: date, link } = x;
        const newTitle = x.title
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&quot;/g, "")
          .replace(/\"n/, "")
          .replace(/&amp;/g, "")
          .replace(/&apos;/g, "")
          .replace(/&lt;/g, "");
        const newArticle = x.description
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&quot;/g, "")
          .replace(/\"n/, "")
          .replace(/&amp;/g, "")
          .replace(/&apos;/g, "")
          .replace(/&gt;/g, "");

        values.push({
          newTitle,
          date,
          link,
          newArticle,
        });
      });
      setNews(values);
      // 호출된 콜백 함수에 데이터 전달
      // if (onGetNews) {
      //     onGetNews(values);
      // }
    }
  };

  const sendNews = (e) => {
    window.open(e.target.dataset.link);
  };

  return (
    // <>
    //     <div onClick={getNews}>
    //         click
    //     </div>
    //     { news.length!==0 && (<>
    //         <div data-link={news[0].link} onClick={sendNews}>{news[0].newTitle}</div>
    //         <div>{news[0].newArticle}</div>
    //     </>
    //     ) }
    // </>
    <>
      {news.length !== 0 && (
        <>
          <div
            className="card-body"
            style={{ paddingBottom: 0, overflow: "auto" }}
          >
            <h5 data-link={news[0].link} onClick={sendNews}>
              {news[0].newTitle}
            </h5>
            <p>{news[0].newArticle.substr(0, 90)}...</p>
            <hr />
            <h5 data-link={news[1].link} onClick={sendNews}>
              {news[1].newTitle}
            </h5>
            <p>{news[1].newArticle.substr(0, 90)}...</p>
            <hr />
            <h5 data-link={news[2].link} onClick={sendNews}>
              {news[2].newTitle}
            </h5>
            <p>{news[2].newArticle.substr(0, 90)}...</p>
            <hr />
            <h5 data-link={news[3].link} onClick={sendNews}>
              {news[3].newTitle}
            </h5>
            <p>{news[3].newArticle.substr(0, 90)}...</p>
            <hr />
            <h5 data-link={news[4].link} onClick={sendNews}>
              {news[4].newTitle}
            </h5>
            <p>{news[4].newArticle.substr(0, 90)}...</p>
            <hr />
          </div>
        </>
      )}
    </>
  );
};

export default NewsTest;
