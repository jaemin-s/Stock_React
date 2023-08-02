import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/layout/Header";
import StockTemplate from "./component/stock/StockTemplate";
import Join from "./component/user/Join";
import Login from "./component/user/Login";
import Footer from "./component/layout/Footer";
import Guide from "./component/layout/guideline/guide";
import MyPage from "./component/user/MyPage";
import Detail from "./component/detail/Detail";
import { AuthContextProvider } from "./component/util/AuthContext";
import KakaoAuthHandle from "./component/user/KakaoAuthHandle";
import Notice from "./component/board/Notice";
import InquiryBoard from "./component/board/InquiryBoard";
import BoardRegist from "./component/board/BoardRegist";
import AdminPage from "./component/adminPage/AdminPage";
import PrivateRoute from "./component/util/PrivateRoute";
import NotFound from "./component/util/NotFound";

function App() {
  return (
    <AuthContextProvider>
      <div className="wrapper">
        <Header />

        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<StockTemplate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/guide" element={<Guide />} />
            <Route
              path="/mypage"
              element={
                <PrivateRoute
                  authenticated={
                    localStorage.getItem("isLoggedIn") === "1" &&
                    (localStorage.getItem("LOGIN_USERROLE") === "GOLD" ||
                      localStorage.getItem("LOGIN_USERROLE") === "SILVER" ||
                      localStorage.getItem("LOGIN_USERROLE") === "BRONZE")
                  }
                  Component={<MyPage />}
                />
              }
            />
            <Route path="/detail/:value" element={<Detail />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/inquiry" element={<InquiryBoard />} />
            <Route path="/regist" element={<BoardRegist />} />
            <Route
              path="/adminPage"
              element={
                <PrivateRoute
                  authenticated={
                    localStorage.getItem("isLoggedIn") === "1" &&
                    localStorage.getItem("LOGIN_USERROLE") === "ADMIN"
                  }
                  Component={<AdminPage />}
                />
              }
            />
            <Route
              path="/api/user/callback/kakao"
              element={<KakaoAuthHandle />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
