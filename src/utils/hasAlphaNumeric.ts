/**
 * 주어진 문자열이 알파벳과 숫자를 모두 포함하고, 특수문자 중 하나를 포함하며,
 * 최소 8자 이상의 길이를 가지고 있는지를 확인합니다.
 * @param input 입력 문자열
 */

export default function hasAlphaNumeric(input: string) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(input);
}
