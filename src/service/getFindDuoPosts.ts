import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import { PostsDataRes } from '../types/post';
import isCustomAxiosError from './isCustomAxiosError';
import instance from './instance';

/**
 * 듀오 게시글을 가져오는 함수입니다.
 * @param {string} lane - 라인 옵션입니다.
 * @param {queueType} queueType - 게임 타입 옵션입니다.
 * @param {string} tier - 티어 옵션입니다.
 * @param {isRiotVerified} isRiotVerified - 소환사 라이엇 인증 여부입니다.
 * @param {number} page - 페이지 옵션입니다.
 */

export default async function getFindDuoPosts(
  lane: string,
  queueType: string,
  tier: string,
  isRiotVerified: boolean,
  page: number,
): Promise<PostsDataRes> {
  try {
    // 듀오 게시글을 받아옵니다.
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
