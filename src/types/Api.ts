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

export interface ServerAPIErrorResponse {
  error: string;
  status: number;
  message: string;
}
