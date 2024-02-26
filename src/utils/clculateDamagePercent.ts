export default function calculateDamagePercentage(
  matchMaxDamage: number,
  summonerDamage: number,
) {
  return (summonerDamage / matchMaxDamage) * 100;
}
