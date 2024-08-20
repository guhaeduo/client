/**
 * 사용자의 이메일을 파싱하여 서비스 도메인을 반환합니다.
 * @param {string} email - 사용자 이메일 입니다.
 */

export default function emailServiceToDomain(email: string): string {
  // 자주 사용되는 도메인을 매핑해둡니다.
  const domainMapping: { [key: string]: string } = {
    'naver.com': 'naver.com',
    'daum.net': 'daum.net',
    'hanmail.net': 'hanmail.net',
    'gmail.com': 'google.com',
  };

  // 구분자의 인덱스를 저장합니다.
  const atIndex = email.indexOf('@');

  if (atIndex !== -1) {
    // 이메일에서 도메인을 추출합니다.
    const domain = email.substring(atIndex + 1);
    // 이미 매핑되어 있다면 매핑된 값을, 아니라면 추출한 도메인을 반환합니다.
    return domainMapping[domain] || domain;
  }
  return '';
}
