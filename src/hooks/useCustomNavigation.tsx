import { useNavigate } from 'react-router-dom';
import PATH from 'constants/path';
/**
 * 어플리케이션에서 사용될 라우팅 함수를 모아둔 훅입니다.
 */
export default function useCustomNavigation() {
  const navigate = useNavigate();

  /** 메인 페이지로 이동하는 함수입니다. */
  const navHome = () => navigate(PATH.home);

  /** 로그인 페이지로 이동하는 함수입니다. */
  const navLogin = () => navigate(PATH.login);

  /** 회원가입 페이지로 이동하는 함수입니다. */
  const navSignup = () => navigate(PATH.signup);

  /** 비밀번호 변경 요청 페이지로 이동하는 함수입니다. */
  const navResetPassword = (email?: string) =>
    navigate(`${PATH.resetPasswordEmailSend}${email ? `?email=${email}` : ''}`);

  /** 프로필 페이지로 이동하는 함수입니다. */
  const navProfile = () => navigate(PATH.profile);

  /** 소환사 검색 페이지로 이동하는 함수입니다. */
  const navSummonerSearch = ({
    country,
    name,
    tag,
  }: {
    country: string;
    name: string;
    tag: string;
  }) => navigate(`/summoners/${country}/${name}-${tag}`);

  /** 듀오 검색 페이지로 이동하는 함수입니다. */
  const navFindDuo = () => navigate(PATH.findDuo);

  return {
    navHome,
    navLogin,
    navSignup,
    navResetPassword,
    navProfile,
    navSummonerSearch,
    navFindDuo,
  };
}
