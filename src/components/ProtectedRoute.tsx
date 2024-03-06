import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { Navigate } from 'react-router-dom';
import LOCATION from 'constants/location';
import tokenReIssue from 'service/reIssue';
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
    return <Navigate to={LOCATION.HOME} />;
  }
  if (requiredLogin && accessToken) {
    tokenReIssue();
  }
  return <>{children}</>;
}
