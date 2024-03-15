import axios, { AxiosError } from 'axios';
import { ServerAPIErrorResponse } from 'types/Api';

export default function isCustomAxiosError(
  err: unknown,
): err is AxiosError<ServerAPIErrorResponse> {
  return axios.isAxiosError<ServerAPIErrorResponse>(err);
}
