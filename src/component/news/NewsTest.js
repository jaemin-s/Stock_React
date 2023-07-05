import React, { useState } from 'react'
import { N_NEWS_ID, N_NEWS_KEY } from '../../config/apikey';

const NewsTest = () => {

    const [ news, setNews ] = useState([]);

    const requestHeader = {
        'X-Naver-Client-Id' : N_NEWS_ID,
        'X-Naver-Client-Secret' : N_NEWS_KEY 
    };

    const getNews = async() =>{
       const query = '삼성전자';
        const res = await fetch('/search/news.json?query=' + query,{
            headers : requestHeader
        });
        if(res.status === 200){
            const data = await res.json();
            // console.log(data);
            let values = [];
            
            data.items.forEach( x => {
                // const oldTitle = values[0].title;
                const { 
                    pubDate : date,
                    link 
                } = x;
                const newTitle = x.title.replace(/(<([^>]+)>)/ig,"").replace(/&quot;/g,"").replace(/\"n/,"").replace(/&amp;/g,"").replace(/&apos;/g,"");
                const newArticle = x.description.replace(/(<([^>]+)>)/ig,"").replace(/&quot;/g,"").replace(/\"n/,"").replace(/&amp;/g,"").replace(/&apos;/g,"");
                
                values.push({
                   newTitle, date, link, newArticle
                });
            });
            
            setNews(values);
        }
    }

    const sendNews = e => {
        window.open(news[0].link)
    }

  return (
    <>
        <div onClick={getNews}>
            click
        </div>
        { news.length!==0 && (<>
            <div data-link={news[0].link} onClick={sendNews}>{news[0].newTitle}</div>
            <div>{news[0].newArticle}</div>
        </>
        ) }
    </>
  )
}

export default NewsTest;


