import { store } from 'store';
import { login, logout } from 'store/userSlice';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
import instance from './instance';

/** 토큰을 사용해 유저의 정보를 받아오는 함수입니다. */
export default async function fetchUser() {
  try {
    // 토큰을 사용해서 유저의 정보를 받아옵니다.
    const {
      user: { accessToken, tokenType },
    } = store.getState();
    const userRes = await instance.get('/api/member/info', {
      headers: { Authorization: `${tokenType} ${accessToken}` },
    });

    // 스토어의 login함수를 실행하여 로그인 처리합니다.
    store.dispatch(login(userRes.data));
    // 로그인 성공 토스트를 띄웁니다.
    Toast.success(MESSAGE.loginSuccess);
  } catch (error) {
    // 로그인 실패시 로그아웃 처리합니다.
    store.dispatch(logout());
  }
}
