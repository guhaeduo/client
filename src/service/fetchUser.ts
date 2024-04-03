import { store } from 'store';
import { login, logout } from 'store/userSlice';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
import instance from './instance';

export default async function fetchUser() {
  try {
    const {
      user: { accessToken, tokenType },
    } = store.getState();
    const userRes = await instance.get('/api/member/info', {
      headers: { Authorization: `${tokenType} ${accessToken}` },
    });

    store.dispatch(login(userRes.data));
    Toast.success(MESSAGE.LOGIN_SUCCESS);
  } catch (error) {
    store.dispatch(logout());
  }
}
