export default function calculateWinRate(win: number, lose: number) {
  const totalGames = win + lose;
  if (totalGames <= 0) return '0%';
  return Math.floor((win / totalGames) * 100);
}
