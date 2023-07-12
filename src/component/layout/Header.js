import React, { useRef, useState } from 'react'
import '../bootstrap/css/sb-admin-2.min.css';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { KI_APP_KEY,KI_SECRET_KEY, DATA_GO_KR_KEY } from '../../config/apikey';
const Header = () => {

  const [query,setQuery] = useState('');
  const redirection = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    // console.log(query);
    if(query.trim() === '') {
      alert('검색어를 입력하세요!!');
      return;
    }
    redirection(`/Detail/${query}`);
  };

  const queryHandler = (e) => {
    setQuery(e.target.value);
  };


  const [data, setData] = useState(null); // 결과를 저장할 상태
    let corps;
  const getCode = async (e) => {
      try {
          corps = e.target.dataset.stockId;
          console.log(corps);
          const res = await fetch('https://apis.data.go.kr/1160100/service/GetCorpBasicInfoService_V2/getCorpOutline_V2?pageNo=1&resultType=json&serviceKey='+ DATA_GO_KR_KEY +'&numOfRows=20&corpNm='+ corps+'');

          if (res.status === 200) {
              const data = await res.json();
              setData(data.response.body.items.item);  // 결과를 상태에 저장
              console.log(data);
          }
      } catch (error) {
      console.error(error);
      }
  };



  const findStockCode = (stockName) => {
    const stock = data.find((item) => item.corpNm === stockName); //이름
    if(stock) {
        return stock.fssCorpUnqNo;    //코드
    } else {
        return null;
    }
  };

  const stockName = corps;
  // const stockCode = findStockCode(stockName);
  // console.log(stockCode);

  return (
  <div style={{ display: "flex", justifyContent: "center", lineHeight: "5" }}>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/" >
            <img src={require('./guideline/image/logo.PNG')} alt="@" className="center-image" style={{width: '180px',marginRight: '100px'}}></img>
              <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/guide" style={{marginRight: "100px"}}>Guide</a>
          </li>
          <li className="nav-item" style={{ flex: 1, textAlign: "center",  marginTop: "40px" }}>
            <nav className="navbar navbar-light bg-light" style={{}}>
              <form className="container-fluid" onSubmit={searchHandler}>
                <div className="input-group">
                  <button>
                    <span className="input-group-text" id="basic-addon1">
                      <img src={require('../bootstrap/img/search.png')} alt='search' style={{ width: "25px", border: "none" }}></img>
                    </span>
                  </button>
                  <i className="fa-regular fa-magnifying-glass"></i>
                  <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" 
                    value={query} onChange={queryHandler}/>
{/* 
    <ul onClick={getCode}>
                    <li data-stock-id="삼성전자">asdasd</li>
                </ul> */}

                </div>
              </form>
            </nav>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login" style={{marginLeft: "100px"}}>Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/join" style={{marginLeft: "100px"}}>Join</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/mypage" style={{marginLeft: "100px"}}>MyPage</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>



  )
}

export default Header;