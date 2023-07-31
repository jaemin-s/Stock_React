import React from 'react'
import { Modal, ModalBody } from 'reactstrap'

const ScoreControl = ({ isOpen, toggleHandler }) => {


    
    return (
        <Modal isOpen={isOpen} toggle={toggleHandler} style={{ width: 1000 }}>
            <ModalBody>
                <div className='point-box'>
                    <div>
                        춘식이님의 포인트는 "50점"입니다
                    </div>
                    <div>
                        <div>포인트 부여하기</div>
                        <input />
                        <div>000점을 부여하겠습니까?</div>
                    </div>
                    <button>완료</button>
                </div>
            </ModalBody>
        </Modal>
      )
    }

export default ScoreControl