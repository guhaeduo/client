import { AxiosResponse } from 'axios';
import { updateToken } from 'store/userSlice';
import { store } from 'store';

export default function handleTokenUpdate(response: AxiosResponse) {
  const accessToken = response.headers['access-token'];
  const refreshToken = response.headers['refresh-token'];
  const tokenType = response.headers['token-type'];
  if (accessToken) store.dispatch(updateToken({ accessToken }));
  if (refreshToken) store.dispatch(updateToken({ refreshToken }));
  if (tokenType) store.dispatch(updateToken({ tokenType }));
}
