const LOCATION = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  RESET_PASSWORD: '/accounts/reset-password',
  PROFILE: '/profile',
  SUMMONER_SEARCH: '/summoners',
  FIND_DUO: '/find-duo',
  KAKAO_AUTH_URL: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`,
  DISCORD_AUTH_URL: `https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_DISCORD_REDIRECT_URL}&scope=identify+email`,
};

export default LOCATION;
