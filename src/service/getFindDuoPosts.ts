import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import { PostsDataRes } from '../types/post';
import isCustomAxiosError from './isCustomAxiosError';
import instance from './instance';

export default async function getFindDuoPosts(
  lane: string,
  queueType: string,
  tier: string,
  isRiotVerified: boolean,
  page: number,
): Promise<PostsDataRes> {
  try {
    const duoPostsRes = await instance.get<PostsDataRes>(
      `/api/duo?lane=${lane}&queueType=${queueType}&tier=${tier}&isRiotVerified=${isRiotVerified}&page=${page}`,
    );

    return duoPostsRes.data;
  } catch (err) {
    if (isCustomAxiosError(err) && err.response) {
      throw new Error(err.response?.data.message);
    }
    throw new Error(UNKNOWN_NET_ERROR_MESSAGE);
  }
}
