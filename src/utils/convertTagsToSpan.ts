/**
 * string으로 작성된 HTML태그를 전달 받아 변경하는 함수
 * @param {string} inputString - 변경할 string형식의 HTML태그
 */

export default function convertTagsToSpan(inputString: string) {
  const regex = /<(?!br\s*\/?)[^>]+>/g;
  // br태그를 제외한 모든 태그를 span으로 변경
  return inputString.replace(regex, '<span>');
}
