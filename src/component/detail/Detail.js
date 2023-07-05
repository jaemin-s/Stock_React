
import React, { useState } from 'react'
import './Detail.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Detail = () => {

  //모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false); //매수
  const [modalType, setModalType] = useState(false); //매도

  //호가, 뉴스, 종목정보, 내주식 관리
  const [stockPrice, setShowPrice] = useState(false);
  const [news, setNews] = useState(false);
  const [info, setInfo] = useState(false);
  const [myStock, setMyStock] = useState(false);
  
  const showMyStock = () => {
      setShowPrice(false);
      setNews(false);
      setInfo(false);
      setMyStock(!myStock);
  }

  const showInfo = () => {
      setShowPrice(false);
      setNews(false);
      setInfo(!info);
      setMyStock(false);
  }

  const showNews = () => {
      setShowPrice(false);
      setNews(!news);
      setInfo(false);
      setMyStock(false);
  }

  const showPrice = () => {
      setShowPrice(!stockPrice);
      setNews(false);
      setInfo(false);
      setMyStock(false);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const sellModal = () => {
    setModalType(!modalType);
  };

  const modalBuy = (
    <>
    <Modal isOpen={isModalOpen} toggle={toggleModal} style={{maxWidth: 2000,width: 600, marginTop: 200}}>
        <ModalHeader toggle={toggleModal}>매수하기</ModalHeader>
        <ModalBody>
          {/* 여기에 모달 컨텐츠를 추가하세요 */}
          <div id='modal-detail' className='flex'>
            <div className='flex'>
                <div className='box1'>
                    <div>주문단가</div>
                    <div>총 주문금액</div>
                </div>
                <div className='box2'>
                    <div>12,120원</div>
                    <div className='won'>원</div>
                </div>
            </div>
            <div className='box3'>
                <h5>주문수량</h5>
                <input className='form-control bg-light border-0 small' placeholder='주' 
                    type="number" min='1' style={{textAlign: 'right'}}/>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>매수</Button>
          <Button color="secondary" onClick={toggleModal}>취소</Button>
        </ModalFooter>
        </Modal>
    </>
  );

  const modalSell = (
    <>
    <Modal isOpen={modalType} toggle={sellModal} style={{maxWidth: 2000,width: 600, marginTop: 200}}>
        <ModalHeader toggle={toggleModal}>매도하기</ModalHeader>
        <ModalBody>
          {/* 여기에 모달 컨텐츠를 추가하세요 */}
          <div id='modal-detail' className='flex'>
            <div className='flex'>
                <div className='box1'>
                    <div>주문단가</div>
                    <div>총 주문금액</div>
                </div>
                <div className='box2'>
                    <div>12,120원</div>
                    <div className='won'>원</div>
                </div>
            </div>
            <div className='box3'>
                <h5>주문수량</h5>
                <input className='form-control bg-light border-0 small' placeholder='주' 
                    type="number" min='1' style={{textAlign: 'right'}}/>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={sellModal}>매도</Button>
          <Button color="secondary" onClick={sellModal}>취소</Button>
        </ModalFooter>
        </Modal>
    </>
  );

  const viewNews = (
    <>
    <div className="card-body">
    <p>'코스피 지수 3000 돌파!'는 사라진 꿈이었나.. 잃어버린 우리의 코스피를 찾아서</p>
    <hr/>
    <p>대기업도 못 버틴 한한령… 현대차 中법인 매출 75% 급감했다</p>
    <hr/>
    <p>평택시, 쓰레기 무단투기 예방 순회 사진전 개최</p>
    <hr/>
    <p>반도체 한파 삼성전자, 성과급 전년 대비 반의 반토막</p>
    <hr/>
    </div>
    </>
  );

  const viewPrice = (
    <>
    <div className="card-body">
        <div>호가호가호가호가</div>
    </div>
    <div className='flex'>
        <button className='btn btn-sm btn-user btn-primary' onClick={toggleModal}>매수</button>
        <button className='btn btn-sm btn-user btn-danger' onClick={sellModal}>매도</button>
    </div>
        
    </>
  );

  const viewInfo = (
    <>
    <div className="card-body">
        <div>종목정보종목정보</div>
    </div>
    </>
  );

  const viewMyStock = (
    <>
    <div className="card-body">
        <div>내 정보 내 정보</div>
    </div>
    </>
  );
    
  return (
    <>
    <body id="page-top" style={{width:'80%'}}>
        <div id="wrapper">
            <div id="container">
            <h1>카카오</h1>
           
            <div className="margin-wrapper">
            
                <div className="middle-content  flex">
                    <div id='first-box' className="popular-trade card shadow mb-4">
                        <div className="card-header">
                            <h6 className="m-0 font-weight-bold text-primary">즐겨찾기</h6>
                        </div>
                        <div className="card-body">즐겨찾기 내용</div>
                    </div>
                    <div id='second-box' className="popular-trade card shadow mb-4">
                        <div className="card-header">
                            <h6 className="m-0 font-weight-bold text-primary">그래프</h6>
                        </div>
                        <div className="card-body">그래프 내용</div>
                    </div>
                    <div id='third-box' className="popular-trade card shadow mb-4">
                        <div className="card-header">
                            <h6 className="m-0 font-weight-bold text-primary">
                                <span id='price' className='border-bottom-primary' onClick={showPrice}>호가</span>
                                <span id='news' className='border-bottom-primary' onClick={showNews}>뉴스</span>
                                <span id='info' className='border-bottom-primary' onClick={showInfo}>종목정보</span>
                                <span id='myStock' className='border-bottom-primary' onClick={showMyStock}>내주식</span>
                            </h6>
                        </div>
                            {stockPrice && viewPrice}
                            {news && viewNews}
                            {info && viewInfo}
                            {myStock && viewMyStock}
                    </div>
                </div>
                <hr/>
                <div className='flex bottom-content'>
                    <div id='last-box' className="simulated-rank card shadow mb-4">
                        <div className='card-header'>
                            <h6 className="m-0 font-weight-bold text-primary">관련종목 추천</h6>
                        </div>
                        <div className="card-body">
                            <button>카카오페이</button>
                            <button>카카오뱅크</button>
                            <button>카카오화재</button>
                            <button>카카오게임즈</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
        </div>
    </body>
    {isModalOpen && modalBuy}
    {modalType && modalSell}
    </>
  )
}

export default Detail;







