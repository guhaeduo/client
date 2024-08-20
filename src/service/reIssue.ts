import { store } from 'store';
import isTokenExpired from 'utils/isTokenExpired';
import axios from 'axios';
import { logout } from 'store/userSlice';
import Toast from 'utils/toast';
import handleTokenUpdate from './handleTokenUpdate';
import { REFRESH_TOKEN_EXPIRED_ERROR_MESSAGE } from '../constants/api';

interface ReIssueErrorResponse {
  code: string;
  message: string;
}

/** 토큰의 유효성을 검사하고는 함수입니다. */
export default async function tokenReIssue() {
  const {
    user: { accessToken, refreshToken, tokenType },
  } = store.getState(); // 스토어에서 유저의 정보를 갖고옵니다.

  if (!(accessToken && refreshToken)) return; // 만약 토큰 두개중 하나라도 없다면 즉시 함수를 종료합니다.

  // accessToken이 만료되었다면 실행합니다.
  if (accessToken && isTokenExpired(accessToken)) {
    try {
      const tokenRes = await axios.post(
        // refreshToken을 싣어 accessToken 재발급 요청을 보냅니다.
        `${process.env.REACT_APP_SERVER_URL}/api/oauth/refresh`,
        {
          refreshToken: `${tokenType} ${refreshToken}`,
        },
      );
      // 성공적으로 받아왔다면 accessToken을 업데이트 합니다.
      handleTokenUpdate(tokenRes);
    } catch (err) {
      if (axios.isAxiosError<ReIssueErrorResponse>(err) && err.response) {
        if (err.response.data.message === REFRESH_TOKEN_EXPIRED_ERROR_MESSAGE) {
          // refreshToken 만료 응답이 온다면 로그아웃 시키고 로그인 페이지로 이동시킵니다.
          store.dispatch(logout());
          Toast.info('세션이 만료되었습니다.');
          window.location.replace('/login');
        }
      }
    }
  }
}
