export function calculateGameDuration(gameDuration: number) {
  const hours = Math.floor(gameDuration / 3600);
  const minutes = Math.floor((gameDuration % 3600) / 60);
  const seconds = gameDuration % 60;

  let durationString = '';

  if (hours > 0) {
    durationString += `${hours}시간 `;
  }

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  durationString += `${formattedMinutes}분 ${formattedSeconds}초`;

  return durationString.trim();
}

export function calculateTimeStamp(date: number): string {
  const now = Date.now();
  const timeDiff = now - date;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (years > 0) return `${years}년 전`;
  if (months > 0) return `${months}달 전`;
  if (weeks > 0) return `${weeks}주 전`;
  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  if (seconds > 0) return `${seconds}초 전`;
  return '방금 전';
}

/**
 * 소환사 평점 계산 함수입니다
 * @param {number} kills - 소환사 킬
 * @param {number} deaths - 소환사 데스
 * @param {number} assists - 소환사 어시스트
 */

export function calculateGrade(kills: number, deaths: number, assists: number) {
  const death = deaths === 0 ? 1 : deaths;
  return +((kills + assists) / death).toFixed(2);
}

export function calculateWinRate(win: number, lose: number) {
  const totalGames = win + lose;
  if (totalGames <= 0) return '0%';
  return `${Math.floor((win / totalGames) * 100)}%`;
}

export function calculateDamagePercentage(
  matchMaxDamage: number,
  summonerDamage: number,
) {
  return (summonerDamage / matchMaxDamage) * 100;
}
