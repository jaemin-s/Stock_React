import React from 'react'
import '../bootstrap/css/sb-admin-2.min.css';
const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{}}>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Logo <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/guide">Guide</a>
      </li>
      <nav class="navbar navbar-light bg-light">
  <form class="container-fluid">
    <div class="input-group">
      <span class="input-group-text" id="basic-addon1">
        <img src={require('../bootstrap/img/search.png')} alt='search' style={{width: "25px"}}></img>
      </span>
      <i class="fa-regular fa-magnifying-glass"></i>
      <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"/>
    </div>
  </form>
</nav>
      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/join">Join</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> */}
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
    </div>
  )
}

export default Header;