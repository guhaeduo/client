import { SearchHistory } from 'types/summoner';

/**
 * 새로운 최근검색 기록을 반환하는 함수입니다.
 * @param {string} name - 소환사 이름입니다.
 * @param {string} tag - 소환사 태그입니다.
 * @param {string} country - 소환사 국가입니다.
 * @param {SearchHistory[]} recentSearchHistory - 기존의 즐겨찾기 검색기록입니다.
 * @param {SearchHistory[]} favoriteSearchHistory - 기존의 즐겨찾기 검색기록입니다.
 */

export default function getNewRecentSearchHistory(
  name: string,
  tag: string,
  country: string,
  recentSearchHistory: SearchHistory[],
  favoriteSearchHistory: SearchHistory[],
) {
  console.log(name, tag, country, recentSearchHistory, favoriteSearchHistory);
  // 중복된 항목을 찾는 함수입니다.
  const isDuplicated = (history: SearchHistory) =>
    history.name === name && history.tag === tag && history.country === country;

  // 최근 검색에 중복된 항목의 인덱스를 관리하는 변수입니다.
  const recentHistoryExistingIndex =
    recentSearchHistory.findIndex(isDuplicated);
  // 최근 검색에 중복하는 요소가 있는지 관리하는 변수입니다.
  const isRecentHistoryNotDuplicated = recentHistoryExistingIndex === -1;

  // 즐겨찾기에 중복된 항목의 인덱스를 관리하는 변수입니다.
  const favoriteHistoryExistingIndex =
    favoriteSearchHistory.findIndex(isDuplicated);
  // 즐겨찾기에 중복하는 요소가 있는지 관리하는 변수입니다.
  const isFavoriteHistoryNotDuplicated = favoriteHistoryExistingIndex === -1;

  // 최근 검색에도 없고, 즐겨찾기에도 없다면 새로 만들어서 리턴
  if (isRecentHistoryNotDuplicated && isFavoriteHistoryNotDuplicated) {
    // 새롭게 객체를 생성하고, isFavorite는 False로 설정한 뒤에 최대 5개까지만 리턴합니다.
    const newSearch = { name, tag, country, isFavorite: false };
    return [newSearch, ...recentSearchHistory.slice(0, 4)];
  }

  // 중복이 존재한다면 중복한 요소를 맨 앞으로 설정하고, 중복된 인덱스를 제외한 나머지 요소를 리턴합니다.
  return [
    isFavoriteHistoryNotDuplicated
      ? recentSearchHistory[recentHistoryExistingIndex]
      : favoriteSearchHistory[favoriteHistoryExistingIndex],
    ...recentSearchHistory.filter(
      (_, index) => index !== recentHistoryExistingIndex,
    ),
  ];
}
