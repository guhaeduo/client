/**
 * JWT 토큰의 페이로드를 해석하여 반환합니다.
 * @param token JWT 토큰 문자열
 */
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));
  return payload;
}

/**
 * JWT 토큰이 만료되었는지를 확인합니다.
 * @param token JWT 토큰 문자열
 */
export default function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) {
    return true; // 페이로드가 없거나 만료 시간(exp)이 없으면 토큰이 만료됨
  }
  const currentTime = Math.floor(Date.now() / 1000) + 5; // 현재 시간에서 5초를 더해서 검사
  return payload.exp < currentTime;
}
