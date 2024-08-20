import PATH from './path';

// 각 페이지의 SEO 정보를 포함하는 객체입니다.
const SEO_DATA = {
  home: {
    title: '구해듀오',
    pageUrl: PATH.home,
    description: '구해듀오에서 같이 게임을 플레이할 소환사를 만나보세요',
  },
  findDuo: {
    title: '구해듀오 - 듀오찾기',
    pageUrl: PATH.findDuo,
    description: '구해듀오에서 같이 게임을 플레이할 소환사를 만나보세요',
  },
  summonerSearch: {
    pageUrl: PATH.summonerSearch,
    description: '소환사 전적 검색',
  },
  login: {
    title: '로그인',
    pageUrl: PATH.login,
    description: '구해듀오 로그인 페이지입니다.',
  },
  signup: {
    title: '회원가입',
    pageUrl: PATH.signup,
    description: '구해듀오 회원가입 페이지입니다.',
  },
  kakaoLogin: {
    title: '로그인',
    pageUrl: PATH.kakaoLogin,
    description: '구해듀오 로그인 페이지입니다.',
  },
  discordLogin: {
    title: '구해듀오',
    pageUrl: PATH.discordLogin,
    description: '구해듀오 로그인 페이지입니다.',
  },
  passwordResetCodeSend: {
    title: '구해듀오 - 비밀번호 초기화 이메일 전송 페이지',
    pageUrl: PATH.home,
    description: '비밀번호 초기화를 위한 코드 전송 페이지입니다.',
  },
  resetPassword: {
    title: '구해듀오 - 비밀번호 재설정',
    pageUrl: PATH.home,
    description: '비밀번호 재설정 페이지입니다.',
  },
  profile: {
    title: '프로필',
    pageUrl: PATH.profile,
    description: '개인 프로필입니다.',
  },
};

export default SEO_DATA;
