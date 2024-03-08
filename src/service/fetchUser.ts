import { store } from 'store';
import instance from './instance';
import { login, logout } from 'store/userSlice';

export const fetchUser = async () => {
  try {
    const {
      user: { accessToken, tokenType },
    } = store.getState();
    const userRes = await instance.get('/api/member/info', {
      headers: { Authorization: `${tokenType} ${accessToken}` },
    });
    store.dispatch(login(userRes.data));
  } catch (error) {
    store.dispatch(logout());
  }
};
