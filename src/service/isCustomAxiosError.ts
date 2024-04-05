import axios, { AxiosError } from 'axios';
import { APIErrorResponse } from 'types/Api';

export default function isCustomAxiosError(
  err: unknown,
): err is AxiosError<APIErrorResponse> {
  return axios.isAxiosError<APIErrorResponse>(err);
}
