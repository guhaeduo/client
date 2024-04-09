import axios, { AxiosError } from 'axios';
import { APIErrorResponse } from 'types/Api';

/**
 * 에러 객체를 전달 받아 미리 지정한 에러와 형식이 일치한지 여부를 반환합니다.
 * @param {unknown} err - 에러 객체입니다.
 */

export default function isCustomAxiosError(
  err: unknown,
): err is AxiosError<APIErrorResponse> {
  return axios.isAxiosError<APIErrorResponse>(err);
}
