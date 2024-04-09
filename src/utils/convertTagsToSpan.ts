/**
 * 주어진 문자열에 포함된 HTML 태그를 모두 <span> 태그로 변환하여 반환합니다.
 * @param {string} inputString - 변환할 문자열 형식의 HTML 태그
 * @returns {string} 변환된 HTML 문자열
 */
export default function convertTagsToSpan(inputString: string) {
  const regex = /<(?!br\s*\/?)[^>]+>/g;
  // br 태그를 제외한 모든 태그를 <span>으로 변경
  return inputString.replace(regex, '<span>');
}
