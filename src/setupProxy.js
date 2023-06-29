const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/uapi/domestic-stock/v1/quotations',{
      target: 'https://openapi.koreainvestment.com:9443',
      changeOrigin: true
    })
  );
};