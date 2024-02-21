export default function calculateGameDuration(gameDuration: number) {
  const hours = Math.floor(gameDuration / 3600);
  const minutes = Math.floor((gameDuration % 3600) / 60);
  const seconds = gameDuration % 60;

  let durationString = '';

  if (hours > 0) {
    durationString += `${hours}시간 `;
  }

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  durationString += `${formattedMinutes}분 ${formattedSeconds}초`;

  return durationString.trim();
}
