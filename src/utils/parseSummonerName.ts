import MESSAGE from 'constants/message';

/**
 * 주어진 소환사 이름을 파싱하여 올바른 형식인지 확인하고, 올바르다면 이름과 태그를 반환합니다.
 * @param {string} input - 소환사 이름
 */

export default function parseSummonerName(input: string) {
  // 소환사 이름과 태그 구분자의 인덱스
  const index = input.indexOf('#');

  // 입력이 공백인 경우 에러 발생
  if (input.trim() === '') throw new Error(MESSAGE.invalidName);
  // 태그가 없다면 임의의 태그를 리턴
  if (index === -1) return { name: input, tag: 'KR1' };

  // 소환사 이름과 태그 분리
  const name = input.substring(0, index);
  const tag = input.substring(index + 1);

  // 이름과 태그 반환
  return { name, tag };
}
