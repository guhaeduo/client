import MESSAGE from 'constants/message';

/**
 * 소환사 이름을 전달받아, 올바른지 판단후 에러 혹은 이름,태그를 반환하는 함수
 * @param {string} input - 소환사 이름
 */

export default function parseSummonerName(input: string) {
  // 소환사 이름과 태그 구분자의 인덱스
  const index = input.indexOf('#');

  // 태그가 없다면 임의의 태그를 리턴
  if (input.trim() === '') throw new Error(MESSAGE.INVALID_NAME);
  if (index === -1) return { name: input, tag: 'KR1' };

  const name = input.substring(0, index);
  const tag = input.substring(index + 1);

  // 모두 통과했다면, 이름과 태그 반환
  return { name, tag };
}
