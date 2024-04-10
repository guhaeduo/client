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

/**
 * 권한에 따라 라우팅을 제어하는 컴포넌트입니다.
 * @param {boolean} requiredLogin - 로그인해야 접속이 가능한 페이지인지 여부입니다.
 * @param {boolean} requiredUnLogin - 로그인이면 접속이 불가능한 페이지인지 여부입니다.
 * @param {ReactNode} children - children 요소입니다.
 */

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
    return <Navigate to={PATH.home} />;
  }

  // 로그인이 필요한 페이지라면 토큰 검사를 수행합니다.
  if (requiredLogin) tokenReIssue();

  // 모든 조건이 충족한다면 children을 리턴합니다.
  return <>{children}</>;
}
