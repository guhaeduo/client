import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { Navigate } from 'react-router-dom';
import LOCATION from 'constants/location';
import isTokenExpired from 'utils/isTokenExpired';
type Props = {
  requiredLogin: boolean;
  requiredUnLogin: boolean;
  children: ReactNode;
};
export default function ProtectedRoute({
  requiredLogin,
  requiredUnLogin,
  children,
}: Props) {
  const user = useSelector(selectUser);
  const { accessToken } = user;
  if ((user.isLogin && requiredUnLogin) || (!user.isLogin && requiredLogin)) {
    alert('잘못된 접근입니다.');
    return <Navigate to={LOCATION.HOME} />;
  }
  if (requiredLogin && accessToken) {
    if (isTokenExpired(accessToken)) {
      console.log('토큰 만료됨');
    }
  }
  return <>{children}</>;
}
