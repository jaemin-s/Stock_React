
import React from 'react'
import './Detail.scss';

const Detail = () => {
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






