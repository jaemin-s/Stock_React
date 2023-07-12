import React, { useEffect, useState } from 'react'
import Echarts from 'echarts-for-react';
import { KI_APP_KEY,KI_SECRET_KEY } from '../../config/apikey';
import './AskingPrice.scss';
import Header from '../layout/Header';
const AskingPrice = () => {

const requestHeader = {
    'authorization' : localStorage.getItem('ACCESS_TOKEN'),
    'appkey' : KI_APP_KEY,
    'appsecret' : KI_SECRET_KEY
};

const [data, setData] = useState(null);

const getHoga = async () => {
    const code = '000880';  //일단 삼전
    try {
        const res = await fetch('/quotations/inquire-asking-price-exp-ccn?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD='+ code +'', {
            headers: {
            'tr_id': "FHKST01010200",
            ...requestHeader
            }
        });

        if (res.status === 200) {
            const data = await res.json();
            setData(data); // 결과를 상태에 저장
        }
    } catch (error) {
    console.error(error);
    }
};

useEffect(() => {
    getHoga();
}, []);

if(data === null) {
    return <div>Loading...</div>;
}
return (
    <>
    <div className='table-container'>
        <table className='collapsed' id='table'>
            <thead style={{top: 0, padding: '0px'}}>
                <tr className='high'>
                    <th style={{padding: 0}}>매도 잔량</th>
                    <th style={{textAlign: 'center'}}>호가</th>
                    <th>매수 잔량</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        <div className='hoga-bar blue' style={{ width: `${data.output1.askp_rsqn5 / 1300}px` , marginLeft: 'auto', marginRight: '5px', textAlign: 'right' , position: 'relative' }}>
                        <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', right: 0 }}>
                            {data.output1.askp_rsqn5}
                        </span>
                        </div>
                    </td>
                    <td className='hoga'>{data.output1.askp5}</td>
                    <td></td>
                    
                </tr>
                <tr>
                <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div className='hoga-bar blue' style={{ width: `${data.output1.askp_rsqn4 / 1300}px` , marginLeft: 'auto', marginRight: '5px', textAlign: 'right' , position: 'relative' }}>
                        <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', right: 0 }}>
                            {data.output1.askp_rsqn4}
                        </span>
                        </div>
                    </td>
                    <td className='hoga'>{data.output1.askp4}</td>
                    <td></td>
                    
                </tr>
                <tr>
                <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div className='hoga-bar blue' style={{ width: `${data.output1.askp_rsqn3 / 1300}px` , marginLeft: 'auto', marginRight: '5px', textAlign: 'right', position: 'relative' }}>
                        <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', right: 0 }}>
                            {data.output1.askp_rsqn3}
                        </span>
                        </div>
                    </td>
                    <td className='hoga'>{data.output1.askp3}</td>
                    <td></td>
                    
                </tr>
                
                <tr>
                <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div className='hoga-bar blue' style={{ width: `${data.output1.askp_rsqn2 / 1300}px` , marginLeft: 'auto', marginRight: '5px', textAlign: 'right', position: 'relative' }}>
                        <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', right: 0 }}>
                            {data.output1.askp_rsqn2}
                        </span>
                        </div>
                    </td>
                    <td className='hoga' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{data.output1.askp2}</td>
                    <td></td>
                    
                </tr>
                <tr>
                <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div className='hoga-bar blue' style={{ width: `${data.output1.askp_rsqn1 / 1300}px` , marginLeft: 'auto', marginRight: '5px', textAlign: 'right', position: 'relative' }}>
                        <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', right: 0 }}>
                            {data.output1.askp_rsqn1}
                        </span>
                        </div>
                    </td>
                    <td className='hoga'>
                        {data.output1.askp1}
                    </td>
                    <td></td>
                </tr>
                
                
                    {/* 매도잔량 / 매수잔량 */}

                

                <tr>
                    <td></td>
                    <td className='hoga'>{data.output1.bidp1}</td>
                    <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div className='hoga-bar red' style={{ width: `${data.output1.bidp_rsqn1 / 1500}px`, marginRight: 'auto', marginLeft: '5px', textAlign: 'left', position: 'relative' }}>
                            <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', left: 0 }}>
                            {data.output1.bidp_rsqn1}
                            </span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td className='hoga'>{data.output1.bidp2}</td>
                    <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> 
                        <div className='hoga-bar red' style={{ width: `${data.output1.bidp_rsqn2 / 1500}px`, marginRight: 'auto', marginLeft: '5px', textAlign: 'left', position: 'relative' }}>
                        <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', left: 0 }}>
                            {data.output1.bidp_rsqn2}
                        </span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>     
                    <td className='hoga'>{data.output1.bidp3}</td>
                    <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> 
                        <div className='hoga-bar red' style={{ width: `${data.output1.bidp_rsqn3 / 1500}px`, marginRight: 'auto', marginLeft: '5px', textAlign: 'left', position: 'relative' }}>
                        <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', left: 0 }}>
                            {data.output1.bidp_rsqn3}
                        </span>
                        </div>
                    </td>               
                </tr>
                <tr>
                    <td></td>
                    <td className='hoga'>{data.output1.bidp4}</td>
                    <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> 
                        <div className='hoga-bar red' style={{ width: `${data.output1.bidp_rsqn4 / 1500}px`, marginRight: 'auto', marginLeft: '5px', textAlign: 'left', position: 'relative' }}>
                        <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', left: 0 }}>
                            {data.output1.bidp_rsqn4}
                        </span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td className='hoga'>{data.output1.bidp5}</td>
                    <td className='rest' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> 
                        <div className='hoga-bar red' style={{ width: `${data.output1.bidp_rsqn5 / 1500}px`, marginRight: 'auto', marginLeft: '5px', textAlign: 'left', position: 'relative' }}>
                        <span style={{ display: 'inline-block', textAlign: 'center', position: 'absolute', left: 0 }}>
                            {data.output1.bidp_rsqn5}
                        </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </>
    );
    };
    
    export default AskingPrice;