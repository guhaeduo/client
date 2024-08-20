/**
 * 숫자를 전달받아 콤마를 찍은 문자열을 반환합니다.
 * @param {number} number - 변환할 숫자
 */

export default function getCommaSeparatedNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
