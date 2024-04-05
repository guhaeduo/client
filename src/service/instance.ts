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

instance.interceptors.request.use(
  async (config) => {
    // 토큰 검사를 수행합니다.
    await tokenReIssue();
    const {
      user: { accessToken, tokenType },
    } = store.getState();

    if (accessToken) {
      const modifiedConfig = { ...config };
      modifiedConfig.headers.Authorization = `${tokenType} ${accessToken}`;
      return modifiedConfig;
    }
    // 토큰이 없는 경우 원래의 config 객체를 그대로 반환합니다.
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    handleTokenUpdate(response);
    return response;
  },
  (error) => Promise.reject(error),
);

export default instance;
