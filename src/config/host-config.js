//한국투자증권 국내주식시세 URL
export const KI_BASE_DOMAIN = "/uapi/domestic-stock/v1";
//한국투자증권 토큰발급 URL
export const KI_TOKEN_URL =
  "https://openapi.koreainvestment.com:9443/oauth2/tokenP";
//한국투자증권 국내주식시세 URL
export const KI_DOMESTIC_STOCK_URL = "/domestic-stock/v1/quotations";

// 브라우저에서 현재 클라이언트의 호스트 이름 얻어오기
const clientHostName = window.location.hostname; //localhost
let backEndHostName = "http://localhost:8181";
export const API_BASE_URL = backEndHostName;
