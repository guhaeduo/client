/**
 * 소환사 평점 계산 함수입니다
 * @param {number} kills - 소환사 킬
 * @param {number} deaths - 소환사 데스
 * @param {number} assists - 소환사 어시스트
 */

export default function calculateGrade(
  kills: number,
  deaths: number,
  assists: number,
) {
  const death = deaths === 0 ? 1 : deaths;
  return ((kills + assists) / death).toFixed(2);
}
