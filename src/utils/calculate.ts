/**
 * 게임 진행시간을 문자 포맷으로 반환합니다.
 * @param {number} gameDuration - 게임 진행시간
 */

export function calculateGameDuration(gameDuration: number) {
  // 게임 진행 시간에서 시간, 분, 초를 추출 합니다.
  const hours = Math.floor(gameDuration / 3600);
  const minutes = Math.floor((gameDuration % 3600) / 60);
  const seconds = gameDuration % 60;

  // 추출한 값을 통해 배열을 만들고, 이를 원하는 포맷으로 변경합니다.
  const formattedTime = [
    hours > 0 ? `${hours}시간` : null,
    `${String(minutes).padStart(2, '0')}분`,
    `${String(seconds).padStart(2, '0')}초`,
  ]
    .filter(Boolean)
    .join(' ');

  return formattedTime;
}

/**
 * 날짜와 현재 시간의 차이를 계산하여 경과된 시간을 문자열로 반환합니다.
 * @param {number} date - 계산할 날짜의 타임스탬프
 */

export function calculateTimeStamp(date: number): string {
  const now = Date.now(); // 현재 시간의 타임스탬프
  const timeDiff = now - date; // 현재 시간과 주어진 날짜와의 차이 (밀리초 단위)

  // 각 단위로 변환
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // 경과된 시간에 따라 적절한 문자열 반환
  if (years > 0) return `${years}년 전`;
  if (months > 0) return `${months}달 전`;
  if (weeks > 0) return `${weeks}주 전`;
  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  if (seconds > 0) return `${seconds}초 전`;

  // 경과된 시간이 없는 경우
  return '방금 전';
}

/**
 * 소환사 평점을 반환합니다.
 * @param {number} kills - 소환사 킬
 * @param {number} deaths - 소환사 데스
 * @param {number} assists - 소환사 어시스트
 */

export function calculateGrade(kills: number, deaths: number, assists: number) {
  // 소환사의 데스를 저장합니다.
  const death = deaths === 0 ? 1 : deaths;
  return +((kills + assists) / death).toFixed(2);
}

/**
 * 승 | 패를 통해 승률을 반환합니다.
 * @param {number} win - 승리 횟수
 * @param {number} lose - 패배 횟수
 */

export function calculateWinRate(win: number, lose: number) {
  // 승리 횟수와 패배 횟수를 더하여 총 게임 횟수를 저장합니다.
  const totalGames = win + lose;
  // 총 게임횟수가 0과 같거나 작다면 0%를 반환합니다.
  if (totalGames <= 0) return '0%';
  // 승률을 계산하여 반환합니다.
  return `${Math.floor((win / totalGames) * 100)}%`;
}

/**
 * 게임에서의 최대 데미지 유저와 비교하여 얼마나 데미지를 넣었는지 퍼센티지를 반환합니다.
 * @param {number} matchMaxDamage - 게임에서의 최대 데미지
 * @param {number} summonerDamage - 현재 소환사의 데미지
 */

export function calculateDamagePercentage(
  matchMaxDamage: number,
  summonerDamage: number,
) {
  // 현재 유저의 데미지 퍼센티지를 반환합니다.
  return (summonerDamage / matchMaxDamage) * 100;
}
