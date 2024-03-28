const PATH = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  RESET_PASSWORD_EMAIL_SEND: '/accounts/reset-code-send',
  RESET_PASSWORD: '/auth/reset-password/',
  PROFILE: '/profile',
  SUMMONER_SEARCH: '/summoners/:country/:summonerName',
  FIND_DUO: '/find-duo',
  KAKAO_LOGIN_PAGE: '/oauth/kakao',
  DISCORD_LOGIN_PAGE: '/oauth/discord',
  KAKAO_AUTH_URL: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`,
  DISCORD_AUTH_URL: `https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_DISCORD_REDIRECT_URL}&scope=identify+email`,
  TEAM_OF_USE:
    'https://cerulean-dew-30f.notion.site/1635f87695ab4534ba38b583d960d7f0?pvs=4',
  PRIVACY_POLICY:
    'https://cerulean-dew-30f.notion.site/ca3d3c059c984ce1bd2b7e666f7f7c63?pvs=4',
};

export default PATH;
