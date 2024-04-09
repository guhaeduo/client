const PATH = {
  home: '/',
  login: '/login',
  signup: '/signup',
  resetPasswordEmailSend: '/accounts/reset-code-send',
  resetPassword: '/auth/reset-password/',
  profile: '/profile',
  summonerSearch: '/summoners/:country/:summonerName',
  findDuo: '/find-duo',
  kakaoLogin: '/oauth/kakao',
  discordLogin: '/oauth/discord',
  kakaoAuthUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`,
  discordAuthUrl: `https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_DISCORD_REDIRECT_URL}&scope=identify+email`,
  teamOfUse:
    'https://cerulean-dew-30f.notion.site/1635f87695ab4534ba38b583d960d7f0?pvs=4',
  privacyPolicy:
    'https://cerulean-dew-30f.notion.site/ca3d3c059c984ce1bd2b7e666f7f7c63?pvs=4',
};

export default PATH;
