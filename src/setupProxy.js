const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  //한국투자증권
  app.use(
    createProxyMiddleware('/quotations',{
      target: 'https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1',
      changeOrigin: true
    })
  );


  // 공공데이터api 기업정보
  app.use(
    createProxyMiddleware('/getCorpOutline_V2',{
      target: 'https://apis.data.go.kr/1160100/service/GetCorpBasicInfoService_V2',
      changeOrigin: true
    })
  );

  // 공공데이터api 재무정보
  app.use(
    createProxyMiddleware('/getSummFinaStat_V2',{
      target: 'http://apis.data.go.kr/1160100/service/GetFinaStatInfoService_V2',
      changeOrigin: true
    })
  );

   // 공공데이터api 주식시세
   app.use(
    createProxyMiddleware('/getStockPriceInfo',{
      target: 'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService',
      changeOrigin: true
    })
  );

  //네이버 뉴스
  app.use(
    createProxyMiddleware('/search',{
      target: 'https://openapi.naver.com/v1',
      changeOrigin: true
    })
  );

  //네이버 주식
  app.use(
    createProxyMiddleware('/siseJson.naver',{
      target: 'https://api.finance.naver.com',
      changeOrigin: true
    })
  );

};
