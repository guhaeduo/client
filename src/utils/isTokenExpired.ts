interface JwtPayload {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000) + 5; // 현재 시간에서 5초를 더해서 검사
  payload.exp, currentTime;
  return payload.exp < currentTime;
};

const parseJwt = (token: string): JwtPayload | null => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));
  return payload;
};

export default isTokenExpired;
