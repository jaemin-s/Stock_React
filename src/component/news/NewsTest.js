import React from 'react'

const NewsTest = () => {

    const requestHeader = {
        'X-Naver-Client-Id' : '4faR5kJNhKT_ZLX0EmNA',
        'X-Naver-Client-Secret' : '62upEGk6oz'
    };

    const viewNews = async() =>{
       
        const res = await fetch('https://openapi.naver.com/v1/search/news.json?query=삼성전자',{
            headers : requestHeader
        });
        if(res.status === 200){
            const data = await res.json();
            console.log(data);
            const temp = data.items;
            console.log(temp);
        }
    }


  return (
    <div onClick={viewNews}>
        click
    </div>
  )
}

export default NewsTest;


