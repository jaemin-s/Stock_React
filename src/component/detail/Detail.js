
import React, { useState } from 'react'
import './Detail.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Detail = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
    
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
                                <span className='border-bottom-primary'>호가</span>
                                <span className='border-bottom-primary'>뉴스</span>
                                <span className='border-bottom-primary'>종목정보</span>
                                <span className='border-bottom-primary'>내주식</span>
                            </h6>
                        </div>
                        <div className="card-body">뉴스 내용</div>
                        <div className='flex'>
                            <button className='btn btn-sm btn-user btn-primary' onClick={toggleModal}>매수</button>
                            <button className='btn btn-sm btn-user btn-google'>매도</button>
                        </div>
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
    
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>매수 모달창</ModalHeader>
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
                    <div>원</div>
                </div>
            </div>
            <div className='box3'>
                <h5>주문수량</h5>
                <input type="number"/ >주
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>매수</Button>
          <Button color="secondary" onClick={toggleModal}>취소</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Detail;







