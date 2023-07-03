import React from 'react'
import { N_NEWS_ID, N_NEWS_KEY } from '../../config/apikey';

const NewsTest = () => {

    const requestHeader = {
        'X-Naver-Client-Id' : N_NEWS_ID,
        'X-Naver-Client-Secret' : N_NEWS_KEY 
    };

    const viewNews = async() =>{
       
        const res = await fetch('/search/news.json?query=삼성전자',{
            headers : requestHeader
        });
        if(res.status === 200){
            const data = await res.json();
            console.log(data);
            let values = [];
            
            data.items.forEach( x => {
                const { pubDate : date,
                        link ,
                        description,
                        title
                        } = x;
                
                values.push([
                    date, link, description, title
                ]);
            });
            console.log(values);
        }
    }


  return (
    <div onClick={viewNews}>
        click
    </div>
  )
}

export default NewsTest;


