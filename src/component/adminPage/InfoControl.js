import React from "react";

const InfoCotrol = () => {
  return (
    <>
      <Modal isOpen={isModalOpen} toggle={toggleModal} style={{ width: 1000 }}>
        <ModalBody>
          <div className="user-info-box">
            <table className="table">
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                    scope="col"
                  >
                    이름
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    닉네임
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    이메일
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    전화번호
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    성별
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    나이
                  </th>

                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    경력
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    MBTI
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    등급
                  </th>
                  <th
                    scope="col"
                    style={{
                      backgroundColor: "#3385ff",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    관리
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>홍길동</td>
                  <td>춘식이</td>
                  <td>hong@gmail.com</td>
                  <td>01024093845</td>
                  <td>남</td>
                  <td>26</td>
                  <td>입문</td>
                  <td>ENFP</td>
                  <td>브론즈</td>
                  <td>
                    <button
                      style={{ border: "none", backgroundColor: "white" }}
                    >
                      강등
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default InfoCotrol;
