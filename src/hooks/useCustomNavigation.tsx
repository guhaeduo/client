import { useNavigate } from 'react-router-dom';
import LOCATION from 'constants/location';
/**
 * 어플리케이션에서 사용될 라우팅 함수를 모아둔 훅입니다.
 */

export default function useCustomNavigation() {
  const navigate = useNavigate();

  // 메인 페이지로 이동하는 함수입니다.
  const navHome = () => navigate(LOCATION.HOME);

  // 로그인 페이지로 이동하는 함수입니다.
  const navLogin = () => navigate(LOCATION.LOGIN);

  // 회원가입 페이지로 이동하는 함수입니다.
  const navSignup = () => navigate(LOCATION.SIGN_UP);

  // 비밀번호 변경 요청 페이지로 이동하는 함수입니다.
  const navResetPassword = (email: { email: string }) =>
    navigate(`${LOCATION.RESET_PASSWORD}${email ? `?email=${email}` : ''}`);

  // 프로필 페이지로 이동하는 함수입니다.
  const navProfile = () => navigate(LOCATION.PROFILE);

  // 소환사 검색 페이지로 이동하는 함수입니다.
  const navSummonerSearch = ({
    country,
    name,
    tag,
  }: {
    country: string;
    name: string;
    tag: string;
  }) => navigate(`${LOCATION.SUMMONER_SEARCH}/${country}/${name}-${tag}`);

  // 듀오 검색 페이지로 이동하는 함수입니다.
  const navFindDuo = () => navigate(LOCATION.FIND_DUO);

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
