import { AxiosResponse } from 'axios';
import { updateToken } from 'store/userSlice';
import { store } from 'store';

/**
 * 서버에서 응답을 받으면, 토큰 여부를 감지하여 토큰을 업데이트 하는 함수입니다.
 * @param {AxiosResponse} response - 응답 객체입니다.
 */
export default function handleTokenUpdate(response: AxiosResponse) {
  // 응답 객체의 헤더에서 토큰을 가져옵니다.
  const accessToken = response.headers['access-token'];
  const refreshToken = response.headers['refresh-token'];
  const tokenType = response.headers['token-type'];
  // 만약 해당하는 토큰이 존재한다면 스토어의 updateToken을 통해 토큰을 업데이트 합니다.
  if (accessToken) store.dispatch(updateToken({ accessToken }));
  if (refreshToken) store.dispatch(updateToken({ refreshToken }));
  if (tokenType) store.dispatch(updateToken({ tokenType }));
}
