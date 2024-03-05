export default function mapKoreanEmailServiceToDomain(email: string): string {
  const domainMapping: { [key: string]: string } = {
    'naver.com': 'naver.com',
    'daum.net': 'daum.net',
    'hanmail.net': 'hanmail.net',
    'gmail.com': 'google.com',
  };

  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    const domain = email.substring(atIndex + 1);
    return domainMapping[domain] || domain;
  }
  return '';
}
