import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/layout/Header';
import StockTemplate from './component/stock/StockTemplate';
import Join from './component/user/Join';
import Login from './component/user/Login';
import Footer from './component/layout/Footer';
import Guide from './component/layout/guideline/guide'
function App() {

  return (
    <>
      <div className='wrapper'>
        <Header/>
      
        <div className="content-wrapper">
          <Routes>
            <Route path='/' element={ <StockTemplate /> }/>
            <Route path='/login' element={ <Login />}/>
            <Route path='/join' element={ <Join />}/>
            <Route path='/guide' element={ <Guide />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
