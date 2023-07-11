import React, { useRef, useState } from 'react'
import '../bootstrap/css/sb-admin-2.min.css';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
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


  return (
  <div style={{ display: "flex", justifyContent: "center", lineHeight: "5" }}>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/" style={{marginRight: "100px"}}>
            <img src={require('./guideline/image/logo.PNG')} alt="@" className="center-image" style={{width: "70%"}}></img>
              <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/guide" style={{marginRight: "100px"}}>Guide</a>
          </li>
          <li className="nav-item" style={{ flex: 1, textAlign: "center",  marginTop: "60px" }}>
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