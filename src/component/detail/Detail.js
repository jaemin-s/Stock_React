
import React, {useState} from 'react'
import './Detail.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';



const Detail = () => {
    
    // 즐겨찾기 별표 채우기
    const [filled, setFilled] = useState(false);

    const toggleStar = () => {
        setFilled(!filled);
    };

return (
    <>
    <body id="page-top" style={{width:'80%'}}>
        <div id="wrapper">
            <div id="container">
            <h1>
                <span className="star-icon" onClick={toggleStar}>
                    <FontAwesomeIcon icon={filled ? filledStar : emptyStar} style={{color: filled ? '#F9BC28' : 'black', marginBottom: '4px'}}/>&nbsp;
                </span>
            카카오(035720)
            </h1>

            <div className="margin-wrapper">
            
                <div className="middle-content  flex">
                    <div id='first-box' className="popular-trade card shadow mb-4">
                        <div className="card-header">
                            <h6 className="m-0 font-weight-bold text-primary">즐겨찾기</h6>
                        </div>
                        {filled && (
                            <div className="card-body">
                            <div className='like-content'><a href="/detail">카카오</a></div>
                            </div>
                        )}
                        {/* {filled && (
                            <div className="card-body">
                            <div className='like-content'><a href="/detail/{종목명}">{종목명}</a> </div>
                            </div>
                        )} */}
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
                        <div className="card-body">
                            뉴스 내용
                            <p>컴투스, 경영전략부문장에 남재관 전 카카오 부사장 영입</p>
                            <p>카카오, 서비스 장애 피해 보상 마무리...지원금 약 275억원</p>
                            <p>카카오 띠부띠부실 등장...롯데웰푸드, '카카오프렌즈' 캐릭터빵 출시</p>
                            <p>LGU+·카카오모빌리티, 전기차 충전 합작사 설립</p>
                        </div>
                        <div className='flex'>
                            <button className='btn btn-sm btn-user btn-primary'>매수</button>
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
    </>
  )
}

export default Detail;







