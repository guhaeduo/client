import { SearchHistory } from 'types/summoner';

/**
 * 새로운 즐겨찾기 검색 기록을 반환합니다.
 * @param {string} name - 소환사 이름
 * @param {string} tag - 소환사 태그
 * @param {string} country - 소환사 국가
 * @param {boolean} isFavorite - 즐겨찾기 여부
 * @param {SearchHistory[]} favoriteSearchHistory - 기존의 즐겨찾기 검색기록
 */

export default function getNewFavoriteSearchHistory(
  name: string,
  tag: string,
  country: string,
  isFavorite: boolean,
  favoriteSearchHistory: SearchHistory[],
) {
  // 중복된 항목을 찾는 함수입니다.
  const isDuplicated = (history: SearchHistory) =>
    history.name === name && history.tag === tag && history.country === country;
  // 중복된 항목의 인덱스를 관리하는 변수입니다.
  const existingIndex = favoriteSearchHistory.findIndex(isDuplicated);

  if (isFavorite) {
    // 만약 isFavorite이 true라면 이미 기존의 즐겨찾기 항목에 있으므로 해당 인덱스를 제외한 항목들을 리턴합니다.
    return favoriteSearchHistory.filter((_, index) => index !== existingIndex);
  }

  // isFavorite이 false라면 새롭게 추가되는 항목이기에 isFavorite를 true로 설정하고, 최대 5개까지만 리턴합니다.
  const newSearch = { name, tag, country, isFavorite: true };
  return [newSearch, ...favoriteSearchHistory.slice(0, 4)];
}
