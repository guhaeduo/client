import ERROR_MESSAGE from 'constants/errorMessage';

/**
 * 소환사 이름을 전달받아, 올바른지 판단후 에러 혹은 이름,태그를 반환하는 함수
 * @param {string} input - 소환사 이름
 */

export default function parseSummonerName(input: string) {
  // 소환사 이름과 태그 구분자의 인덱스
  const index = input.indexOf('#');

  // 아무것도 입력하지 않았을 때 에러처리
  if (input.trim() === '') throw new Error(ERROR_MESSAGE.INVALID_NAME);

  // 구분자가 없다면 잘못된 태그 에러 발생
  if (index === -1) throw new Error(ERROR_MESSAGE.INVALID_TAG);

  // 이름이 없다면 잘못된 이름 에러 발생
  const name = input.substring(0, index);
  if (!name) throw new Error(ERROR_MESSAGE.INVALID_NAME);

  // 태그가 없다면 잘못된 태그 에러 발생
  const tag = input.substring(index + 1);
  if (!tag) throw new Error(ERROR_MESSAGE.INVALID_TAG);

  // 모두 통과했다면, 이름과 태그 반환
  return { name, tag };
}
