import React, { useEffect, useState } from 'react'
import Echarts from 'echarts-for-react';
import { KI_APP_KEY,KI_SECRET_KEY } from '../../config/apikey';
import './Test.scss';

const Test = () => {

const requestHeader = {
    'authorization' : localStorage.getItem('ACCESS_TOKEN'),
    'appkey' : KI_APP_KEY,
    'appsecret' : KI_SECRET_KEY
};

const [data, setData] = useState(null);

const getHoga = async () => {
    try {
        const res = await fetch("/quotations/inquire-asking-price-exp-ccn?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=005930", {
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
            <thead style={{position: 'sticky', top: 0}}>
                <tr className='high'>
                    <th>매수 잔량</th>
                    <th>호가</th>
                    <th>매도 잔량</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td></td>  
                    <td>{data.output1.bidp10}</td>  
                    <td>{data.output1.askp_rsqn1}</td>  
                </tr>
                <tr>
                    <td></td>
                    <td>{data.output1.bidp9}</td>
                    <td>{data.output1.askp_rsqn2}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>{data.output1.bidp8}</td>
                    <td>{data.output1.askp_rsqn3}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>{data.output1.bidp7}</td>
                    <td>{data.output1.askp_rsqn4}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>{data.output1.bidp6}</td>
                    <td>{data.output1.askp_rsqn5}</td>
                </tr> */}
                <tr>
                    <td></td>
                    <td className='hoga'>{data.output1.bidp5}</td>
                    <td className='rest-sell' style={{}}>
                        <div >{data.output1.askp_rsqn6}</div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td className='hoga'>{data.output1.bidp4}</td>
                    <td className='rest-sell'>{data.output1.askp_rsqn7}</td>
                </tr>
                <tr>
                    <td></td>
                    <td className='hoga'>{data.output1.bidp3}</td>
                    <td className='rest-sell'>{data.output1.askp_rsqn8}</td>
                </tr>
                <tr>
                    <td></td>
                    <td className='hoga'>{data.output1.bidp2}</td>
                    <td className='rest-sell'>{data.output1.askp_rsqn9}</td>
                </tr>
                <tr>
                    <td></td>
                    <td className='hoga'>{data.output1.bidp1}</td>
                    <td className='rest-sell'>{data.output1.askp_rsqn10}</td>
                </tr>




                <tr>
                    <td className='rest-buy'>{data.output1.bidp_rsqn1}</td>
                    <td className='hoga'>{data.output1.askp1}</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='rest-buy'>{data.output1.bidp_rsqn2}</td>
                    <td className='hoga'>{data.output1.askp2}</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='rest-buy'>{data.output1.bidp_rsqn3}</td>
                    <td className='hoga'>{data.output1.askp3}</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='rest-buy'>{data.output1.bidp_rsqn4}</td>
                    <td className='hoga'>{data.output1.askp4}</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='rest-buy'>{data.output1.bidp_rsqn5}</td>
                    <td className='hoga'>{data.output1.askp5}</td>
                    <td></td>
                </tr>
                {/* <tr>
                    <td>{data.output1.bidp_rsqn6}</td>
                    <td>{data.output1.askp6}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{data.output1.bidp_rsqn7}</td>
                    <td>{data.output1.askp7}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{data.output1.bidp_rsqn8}</td>
                    <td>{data.output1.askp8}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{data.output1.bidp_rsqn9}</td>
                    <td>{data.output1.askp9}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{data.output1.bidp_rsqn10}</td>
                    <td>{data.output1.askp10}</td>
                    <td></td>
                </tr> */}
            </tbody>
        </table>
    </div>

    {/* {data.output1 && (
    <div style={{textAlign: 'center', display: 'flex'}}>
        <div className='buyRest' style={{color: 'tomato' , marginRight: '100px'}}>
            <div></div>
            <div>{data.output1.askp_rsqn2}</div>
            <div>{data.output1.askp_rsqn3}</div>
            <div>{data.output1.askp_rsqn4}</div>
            <div>{data.output1.askp_rsqn5}</div>
            <div>{data.output1.askp_rsqn6}</div>
            <div>{data.output1.askp_rsqn7}</div>
            <div>{data.output1.askp_rsqn8}</div>
            <div>{data.output1.askp_rsqn9}</div>
            <div>{data.output1.askp_rsqn10}</div>
        </div>

        <div className='buy' style={{color: 'red' }}>
            <div></div>
            <div>{data.output1.bidp9}</div>
            <div>{data.output1.bidp8}</div>
            <div>{data.output1.bidp7}</div>
            <div>{data.output1.bidp6}</div>
            <div>{data.output1.bidp5}</div>
            <div>{data.output1.bidp4}</div>
            <div>{data.output1.bidp3}</div>
            <div>{data.output1.bidp2}</div>
            <div>{data.output1.bidp1}</div>
        </div>


        <div className='sell' style={{color: 'blue'}}>
            <div>{data.output1.askp1}</div>
            <div>{data.output1.askp2}</div>
            <div>{data.output1.askp3}</div>
            <div>{data.output1.askp4}</div>
            <div>{data.output1.askp5}</div>
            <div>{data.output1.askp6}</div>
            <div>{data.output1.askp7}</div>
            <div>{data.output1.askp8}</div>
            <div>{data.output1.askp9}</div>
            <div>{data.output1.askp10}</div>
        </div>

        <div className='sellRest' style={{color: 'skyblue' , marginLeft: '100px'}}>
            <div>{data.output1.bidp_rsqn1}</div>
            <div>{data.output1.bidp_rsqn2}</div>
            <div>{data.output1.bidp_rsqn3}</div>
            <div>{data.output1.bidp_rsqn4}</div>
            <div>{data.output1.bidp_rsqn5}</div>
            <div>{data.output1.bidp_rsqn6}</div>
            <div>{data.output1.bidp_rsqn7}</div>
            <div>{data.output1.bidp_rsqn8}</div>
            <div>{data.output1.bidp_rsqn9}</div>
            <div>{data.output1.bidp_rsqn10}</div>
        </div>
    </div>
    )} */}
    </>
    );
    };
    
    export default Test;