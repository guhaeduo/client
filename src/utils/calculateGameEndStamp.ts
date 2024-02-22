export default function calculateGameEndStamp(gameEndDate: number): string {
  const now = Date.now();
  const timeDiff = now - gameEndDate;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years}년 전`;
  }
  if (months > 0) {
    return `${months}달 전`;
  }
  if (weeks > 0) {
    return `${weeks}주 전`;
  }
  if (days > 0) {
    return `${days}일 전`;
  }
  if (hours > 0) {
    return `${hours}시간 전`;
  }
  return `${minutes}분 전`;
}
