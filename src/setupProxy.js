const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  //한국투자증권
  app.use(
    createProxyMiddleware('/quotations',{
      target: 'https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1',
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware('/search',{
      target: 'https://openapi.naver.com/v1',
      changeOrigin: true
    })
  );
  
};