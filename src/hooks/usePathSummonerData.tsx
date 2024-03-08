import { useParams } from 'react-router-dom';

/**
 * params에서 소환사의 정보를 가져오는 훅입니다.
 */

export default function usePathSummonerData() {
  const params = useParams();
  const { country, summonerName } = params;
  if (!country || !summonerName) return { country: '', name: '', tag: '' };

  // country와 summonerName을 디코딩 합니다.
  const decodingCountry = decodeURI(country);
  const decodingSummonerName = decodeURI(summonerName);

  // sumonerName에서 구분자 인덱스를 찾습니다.
  const index = decodingSummonerName.indexOf('-');

  // 첫번째 구분자를 제외한 모든 '-' 구분자를 없앱니다.
  const convertNameTag =
    decodingSummonerName.slice(0, index + 1) +
    decodingSummonerName.slice(index + 1).replace(/-/g, '');

  // '-' 구분자를 기준으로 name과 태그를 분리합니다.
  const [name, tag] = convertNameTag.split('-');
  return { country: decodingCountry, name, tag };
}
