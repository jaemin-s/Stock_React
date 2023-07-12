import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/layout/Header';
import StockTemplate from './component/stock/StockTemplate';
import Join from './component/user/Join';
import Login from './component/user/Login';
import Footer from './component/layout/Footer';
import Guide from './component/layout/guideline/guide'
import MyPage from './component/user/MyPage';
import Detail from './component/detail/Detail';
import KakaoLoginHandeler from './component/user/KakaoLoginHandeler';
import { AuthContextProvider } from './component/util/AuthContext';
function App() {

  return (
    <AuthContextProvider>
      <div className='wrapper'>
        <Header/>
      
        <div className="content-wrapper">
          <Routes>
            <Route path='/' element={ <StockTemplate /> }/>
            <Route path='/login' element={ <Login />}/>
            <Route path='/join' element={ <Join />}/>
            <Route path='/guide' element={ <Guide />}/>
            <Route path='/mypage' element={ <MyPage />}/>
            <Route path='/detail/:value' element={ < Detail /> } />
            <Route path="/login/oauth2/callback/kakao" element={<KakaoLoginHandeler />}
       />   

          </Routes>
        </div>
        <Footer />
      </div>
      </AuthContextProvider>
  );
}

export default App;
