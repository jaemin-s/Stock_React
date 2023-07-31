import "./IdModal.scss";
import { API_BASE_URL } from "../../config/host-config";
const IdModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  const fetchSearchId = async () => {
    const $name = document.getElementById("searchName");
    const $phoneNumber = document.getElementById("searchPhoneNumber");

    const res = await fetch(API_BASE_URL + "/api/user/searchId", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: $name.value,
        phoneNumber: $phoneNumber.value,
      }),
    });

    if (res.status === 400) {
      const text = await res.text();
      alert("값을 모두 입력해주세요");
      return;
    }

    const email = await res.text();
    console.log(email);
    alert(`회원님의 email은 ${email} 입니다`);
  };

  //아이디찾기 요청 핸들러
  const searchIdHandler = (e) => {
    e.preventDefault();

    // 서버에 아이디찾기 요청 전송
    fetchSearchId();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal userModal" : "userModal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div className="Search_div">
              <div>
                <h5> 이름 </h5>
                <input type="text" maxLength="6" id="searchName" />
              </div>

              <div>
                <h5> 전화번호 </h5>
                <input
                  type="text"
                  maxLength="11"
                  placeholder="- 제외한 숫자만 입력"
                  id="searchPhoneNumber"
                />
              </div>

              <div>
                <button
                  className="button-58"
                  type="button"
                  value="조회하기"
                  id="searchSubmit"
                  onClick={searchIdHandler}
                >
                  조회하기
                </button>
              </div>

              {/* <div>
                  <h5> 회원님의 이메일은 ${email} 입니다. </h5>
                </div> */}
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default IdModal;
