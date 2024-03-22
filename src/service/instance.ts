import axios, { AxiosResponse } from 'axios';
import { store } from 'store';
import { updateToken } from 'store/userSlice';
import tokenReIssue from './reIssue';

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
      // 만약 accessToken이 존재한다면 headers에 싣어서 전송합니다.
      config.headers.Authorization = `${tokenType} ${accessToken}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    handleTokenUpdate(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export const handleTokenUpdate = (response: AxiosResponse) => {
  const accessToken = response.headers['access-token'];
  const refreshToken = response.headers['refresh-token'];
  const tokenType = response.headers['token-type'];
  if (accessToken) store.dispatch(updateToken({ accessToken }));
  if (refreshToken) store.dispatch(updateToken({ refreshToken }));
  if (tokenType) store.dispatch(updateToken({ tokenType }));
};

export default instance;
