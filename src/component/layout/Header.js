import React from 'react'
import '../bootstrap/css/sb-admin-2.min.css';
import './Header.scss';
const Header = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/" style={{marginRight: "100px"}}>Logo <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/guide" style={{marginRight: "100px"}}>Guide</a>
        </li>
        <li className="nav-item" style={{ flex: 1, textAlign: "center" }}>
          <nav className="navbar navbar-light bg-light">
            <form className="container-fluid">
              <div className="input-group">
              <a href="/Detail">
                <span className="input-group-text" id="basic-addon1">
                  <img src={require('../bootstrap/img/search.png')} alt='search' style={{ width: "25px" }}></img>
                </span>
              </a>
                <i className="fa-regular fa-magnifying-glass"></i>
                <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
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
      </ul>
    </div>
  </nav>
</div>

  )
}

export default Header;