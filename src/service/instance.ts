import axios from 'axios';
import { store } from 'store';
import tokenReIssue from './reIssue';
import handleTokenUpdate from './handleTokenUpdate';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** 서버에 요청을 보낼때 실행되는 함수입니다. */
instance.interceptors.request.use(async (config) => {
  // 토큰의 유효성 검사를 수행합니다.
  await tokenReIssue();
  const {
    user: { accessToken, tokenType },
  } = store.getState();
  // accessToken이 존재한다면, 요청 객체에 토큰을 담아서 보냅니다.
  if (accessToken) {
    const modifiedConfig = { ...config };
    modifiedConfig.headers.Authorization = `${tokenType} ${accessToken}`;
    return modifiedConfig;
  }
  // accessToken이 없는 경우 원래의 config 객체를 그대로 반환합니다.
  return config;
});

/** 서버에서 응답을 받을때 실행되는 함수입니다. */
instance.interceptors.response.use((response) => {
  // 서버의 응답에서 토큰 여부를 감지하여 업데이트 하는 함수를 실행합니다.
  handleTokenUpdate(response);
  return response;
});

export default instance;
