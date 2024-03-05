const LOCATION = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  RESET_PASSWORD: '/accounts/reset-password',
  PROFILE: '/profile',
  SUMMONER_SEARCH: '/summoners',
  FIND_DUO: '/find-duo',
  KAKAO_AUTH_URL: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`,
};

export default LOCATION;
