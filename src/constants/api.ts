import { RiotAPIErrorCode } from 'types/Api';

// Riot API 오류 코드에 대응하는 메시지를 담은 객체입니다.
export const RIOT_API_ERROR_MESSAGE: Record<RiotAPIErrorCode, string> = {
  400: '잘못된 요청입니다.',
  401: '권한이 없습니다.',
  403: '접근이 금지되었습니다.',
  404: '소환사를 찾을 수 없습니다.',
  405: '허용되지 않은 메소드입니다.',
  415: '지원되지 않는 미디어 타입입니다.',
  429: '요청 제한 초과',
  500: '내부 서버 오류가 발생하였습니다.',
  502: '게이트웨이 오류가 발생하였습니다.',
  503: '서비스를 사용할 수 없습니다.',
  504: '게이트웨이 시간이 초과되었습니다.',
};

// 알 수 없는 네트워크 오류가 발생했을 때 사용되는 기본 메시지입니다.
export const UNKNOWN_NET_ERROR_MESSAGE =
  '알 수 없는 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요';

// 소환사 데이터의 갱신 주기를 나타내는 상수입니다. (밀리초 단위)
export const SUMMONER_DATA_STALE_TIME = 24 * 60 * 60 * 1000;

// 만료된 리프레시 토큰 에러 메시지입니다.
export const REFRESH_TOKEN_EXPIRED_ERROR_MESSAGE = '만료된 토큰 정보입니다.';
