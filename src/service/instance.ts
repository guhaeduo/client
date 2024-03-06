import axios, { AxiosResponse } from 'axios';
import { store } from 'store';
import { updateToken } from 'store/userSlice';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => {
    // 응답 데이터에서 토큰 값을 추출합니다.
    handleTokenUpdate(response);

    return response;
  },
  (error) => {
    // 요청 오류가 발생한 경우에는 Promise.reject()로 처리합니다.
    return Promise.reject(error);
  },
);

const handleTokenUpdate = (response: AxiosResponse) => {
  const accessToken = response.headers['accesstoken'];
  const refreshToken = response.headers['refreshtoken'];
  const tokenType = response.headers['token-type'] || 'Bearer';
  if (accessToken) store.dispatch(updateToken({ accessToken }));
  if (refreshToken) store.dispatch(updateToken({ refreshToken }));
  if (tokenType) store.dispatch(updateToken({ tokenType }));
};

export default instance;
