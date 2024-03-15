import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { Navigate } from 'react-router-dom';
import PATH from 'constants/path';
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
  // 유저 객체를 가져옵니다.
  const user = useSelector(selectUser);

  // 로그인이 필요하지만, 로그인 상태가 아닐경우
  // 로그인이 되어있으면 안되지만 로그인이 되어있을경우 홈으로 이동 시킵니다.
  if ((user.isLogin && requiredUnLogin) || (!user.isLogin && requiredLogin)) {
    return <Navigate to={PATH.HOME} />;
  }

  // 로그인이 필요한 페이지라면 토큰 검사를 수행합니다.
  if (requiredLogin) tokenReIssue();

  // 모든 조건이 충족한다면 children을 리턴합니다.
  return <>{children}</>;
}
