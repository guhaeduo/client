import { store } from 'store';
import instance from './instance';
import { login, logout } from 'store/userSlice';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
export const fetchUser = async () => {
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
};
