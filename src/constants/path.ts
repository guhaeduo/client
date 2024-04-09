// 애플리케이션 내에서 사용되는 경로 정보를 포함하는 객체입니다.
const PATH = {
  home: '/', // 홈 페이지
  login: '/login', // 로그인 페이지
  signup: '/signup', // 회원가입 페이지
  resetPasswordEmailSend: '/accounts/reset-code-send', // 비밀번호 재설정 이메일 전송 페이지
  resetPassword: '/auth/reset-password/', // 비밀번호 재설정 페이지
  profile: '/profile', // 프로필 페이지
  summonerSearch: '/summoners/:country/:summonerName', // 소환사 검색 페이지
  findDuo: '/find-duo', // 듀오 찾기 페이지
  kakaoLogin: '/oauth/kakao', // 카카오 로그인 경로
  discordLogin: '/oauth/discord', // 디스코드 로그인 경로
  kakaoAuthUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`, // 카카오 인증 URL
  discordAuthUrl: `https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_DISCORD_REDIRECT_URL}&scope=identify+email`, // 디스코드 인증 URL
  teamOfUse:
    'https://cerulean-dew-30f.notion.site/1635f87695ab4534ba38b583d960d7f0?pvs=4', // 이용 약관 페이지 링크
  privacyPolicy:
    'https://cerulean-dew-30f.notion.site/ca3d3c059c984ce1bd2b7e666f7f7c63?pvs=4', // 개인정보 처리방침 페이지 링크
};

export default PATH;
