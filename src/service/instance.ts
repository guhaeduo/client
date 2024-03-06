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
    await tokenReIssue();
    console.log('인스턴스 실행');
    const {
      user: { accessToken, tokenType },
    } = store.getState();
    if (accessToken) {
      config.headers.Authorization = `${tokenType} ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    // 응답 데이터에서 토큰 값을 추출합니다.
    handleTokenUpdate(response);
    return response;
  },
  (error) => {
    // 응답 오류가 발생한 경우에는 Promise.reject()로 처리합니다.
    console.log(error);
    return Promise.reject(error);
  },
);

export const handleTokenUpdate = (response: AxiosResponse) => {
  const accessToken = response.headers['accesstoken'];
  const refreshToken = response.headers['refreshtoken'];
  const tokenType = response.headers['tokentype'] || 'Bearer';
  if (accessToken) store.dispatch(updateToken({ accessToken }));
  if (refreshToken) store.dispatch(updateToken({ refreshToken }));
  if ((refreshToken || accessToken) && tokenType)
    store.dispatch(updateToken({ tokenType }));
};

export default instance;
