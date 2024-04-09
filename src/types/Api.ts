// 라이엇 API의 에러 코드 타입
export type RiotAPIErrorCode =
  | 400
  | 401
  | 403
  | 404
  | 405
  | 415
  | 429
  | 500
  | 502
  | 503
  | 504;

// 서버의 에러 객체의 타입
export interface APIErrorResponse {
  message: string;
  status: number;
}
