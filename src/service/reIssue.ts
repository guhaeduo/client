import { REFRESH_TOKEN_EXPIRED_ERROR_MESSAGE } from './../constants/api';
import { store } from 'store';
import isTokenExpired from 'utils/isTokenExpired';
import axios from 'axios';
import { logout } from 'store/userSlice';
import { handleTokenUpdate } from './instance';

interface ReIssueErrorResponse {
  code: string;
  message: string;
}

export default async function tokenReIssue() {
  const {
    user: { accessToken, refreshToken, tokenType },
  } = store.getState();

  if (!(accessToken && refreshToken)) return;
  if (accessToken && isTokenExpired(accessToken)) {
    try {
      const tokenRes = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/oauth/refresh`,
        {
          refreshToken: `${tokenType} ${refreshToken}`,
        },
      );
      handleTokenUpdate(tokenRes);
    } catch (err) {
      if (axios.isAxiosError<ReIssueErrorResponse>(err) && err.response) {
        if (err.response.data.message === REFRESH_TOKEN_EXPIRED_ERROR_MESSAGE) {
          store.dispatch(logout());
          setTimeout(() => {
            alert('세션이 만료되었습니다.');
            window.location.replace('/login');
          }, 100);
        }
      }
    }
  }
}
