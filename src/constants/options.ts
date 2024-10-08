// 지역과 관련된 정보를 포함하는 객체입니다.
export const COUNTRY = [
  { key: 'kr', display: 'KR', region: 'kr' },
  { key: 'jp', display: 'JP', region: 'jp1' },
  { key: 'ph', display: 'PH', region: 'ph2' },
  { key: 'sg', display: 'SG', region: 'sg2' },
  { key: 'th', display: 'TH', region: 'th2' },
  { key: 'tw', display: 'TW', region: 'tw2' },
  { key: 'vn', display: 'VN', region: 'vn2' },
  { key: 'na', display: 'NA', region: 'na1' },
  { key: 'br', display: 'BR', region: 'br1' },
  { key: 'lan', display: 'LAN', region: 'la1' },
  { key: 'las', display: 'LAS', region: 'la2' },
  { key: 'oce', display: 'OCE', region: 'oc1' },
  { key: 'euw', display: 'EUW', region: 'euw1' },
  { key: 'eune', display: 'EUNE', region: 'eun1' },
  { key: 'ru', display: 'RU', region: 'ru' },
  { key: 'tr', display: 'TR', region: 'tr1' },
];

// 게임 타입과 관련된 정보를 포함하는 객체입니다.
export const QUEUE = [
  { key: 'SOLO', display: '솔로랭크' },
  { key: 'FREE', display: '자유랭크' },
  { key: 'NORMAL', display: '일반' },
  { key: 'ARAM', display: '칼바람' },
];

// 티어와 관련된 정보를 포함하는 객체입니다.
export const TIER = [
  { key: 'ALL', display: '전체 티어' },
  { key: 'CHALLENGER', display: '챌린저' },
  { key: 'GRANDMASTER', display: '그랜드마스터' },
  { key: 'MASTER', display: '마스터' },
  { key: 'EMERALD', display: '에메랄드' },
  { key: 'PLATINUM', display: '플레티넘' },
  { key: 'GOLD', display: '골드' },
  { key: 'SILVER', display: '실버' },
  { key: 'BRONZE', display: '브론즈' },
  { key: 'IRON', display: '아이언' },
  { key: 'UNRANKED', display: '언랭크' },
];

// 라인과 관련된 정보를 포함하는 객체입니다.
export const LANE = [
  { key: 'ALL', display: '모든 라인' },
  { key: 'TOP', display: '탑' },
  { key: 'JUG', display: '정글' },
  { key: 'MID', display: '미드' },
  { key: 'ADC', display: '원딜' },
  { key: 'SUP', display: '서포터' },
];

/**
 * 로컬 저장소에서 챔피언 데이터를 가져와 정렬하여 반환합니다.
 */

export const CHAMPION = () => {
  const localChampionData = JSON.parse(
    localStorage.getItem('championData') as string,
  ).championData;
  const keys = Object.keys(localChampionData);

  return keys
    .map((key) => ({
      key,
      display: localChampionData[key].name,
      icon: localChampionData[key].icon,
    }))
    .sort((a, b) => {
      const nameA = a.display.replace(/[^ㄱ-힣]/g, '');
      const nameB = b.display.replace(/[^ㄱ-힣]/g, '');
      return nameA.localeCompare(nameB, 'ko');
    });
};
