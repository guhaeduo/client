import React, { useEffect } from 'react';
import styles from './searchBar.module.scss';
import classNames from 'classnames/bind';
import { FaRegBookmark } from 'react-icons/fa6';
import { FaBookmark } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import getNewFavoriteSearchHistory from 'utils/getNewFavoriteSearchHistory';
import { SearchHistory } from 'types/summoner';
import useCustomNavigation from 'hooks/useCustomNavigation';
const cn = classNames.bind(styles);

type Props = {
  isSearchInputFocus: boolean;
  recentSearchHistory: SearchHistory[];
  favoriteSearchHistory: SearchHistory[];
  setFavoriteSearchHistory: React.Dispatch<
    React.SetStateAction<SearchHistory[]>
  >;
  setRecentSearchHistory: React.Dispatch<React.SetStateAction<SearchHistory[]>>;
  summonerSearch: (name: string, tag: string, country: string) => void;
};

/**
 * 소환사의 검색기록을 보여주는 컴포넌트입니다.
 * @param {boolean} isSearchInputFocus - SearchInput이 Focus되어있는지 여부를 관리하는 값입니다.
 * @param {SearchHistory[]} recentSearchHistory - 최근 검색기록입니다.
 * @param {SearchHistory[]} favoriteSearchHistory - 즐겨찾기 입니다.
 * @param {React.Dispatch<React.SetStateAction<SearchHistory[]>>} setFavoriteSearchHistory - 즐겨찾기 상태변경 함수입니다.
 * @param {React.Dispatch<React.SetStateAction<SearchHistory[]>>} setRecentSearchHistory - 최근 검색기록 상태변경 함수입니다.
 * @param {(name: string, tag: string, country: string) => void} summonerSearch - 소환사 검색 함수입니다.
 */

export default function SearchHistoryContainer({
  isSearchInputFocus,
  recentSearchHistory,
  favoriteSearchHistory,
  setFavoriteSearchHistory,
  setRecentSearchHistory,
  summonerSearch,
}: Props) {
  const { navSummonerSearch } = useCustomNavigation();

  // 최근 검색기록 삭제 함수입니다.
  const deleteRecentSearchHistory = (
    e: React.MouseEvent<HTMLDivElement>,
    history: SearchHistory,
  ) => {
    e.stopPropagation();
    // 기존의 검색 기록에서 전달받은 검색 기록을 필터링한 변수입니다.
    const filteredRecentSearchHistory = recentSearchHistory.filter(
      (recentHistory) => recentHistory !== history,
    );
    // 필터링된 검색기록으로 상태를 업데이트 합니다.
    setRecentSearchHistory(filteredRecentSearchHistory);
    // 필터링된 검색기록으로 로컬스토리지를 업데이트 합니다.
    localStorage.setItem(
      'recentSearchHistory',
      JSON.stringify(filteredRecentSearchHistory),
    );
  };

  // 즐겨찾기를 업데이트하는 함수입니다.
  const updateFavoriteSearchHistory = (
    e: React.MouseEvent<HTMLDivElement>,
    history: SearchHistory,
  ) => {
    e.stopPropagation();
    const { name, tag, country, isFavorite } = history;
    // 기존의 즐겨찾기 항목과 전달받은 검색 기록을 통해 새로운 즐겨찾기를 관리하는 변수입니다.
    const newFavoriteSearchHistory = getNewFavoriteSearchHistory(
      name,
      tag,
      country,
      isFavorite,
      favoriteSearchHistory,
    );
    // 새로운 즐겨찾기로 상태를 업데이트 합니다.
    setFavoriteSearchHistory(newFavoriteSearchHistory);
    // 새로운 즐겨찾기로 로컬스토리지를 업데이트 합니다.
    localStorage.setItem(
      'favoriteSearchHistory',
      JSON.stringify(newFavoriteSearchHistory),
    );
    // 즐겨찾기된 항목을 최근 검색기록에도 업데이트 적용한 변수입니다.
    const updatedRecentSearchHistory = recentSearchHistory.map(
      (recentHistory) => {
        if (recentHistory === history) {
          return { ...recentHistory, isFavorite: !history.isFavorite };
        }
        return recentHistory;
      },
    );
    // 업데이트된 최근 검색기록으로 상태를 업데이트 합니다.
    setRecentSearchHistory(updatedRecentSearchHistory);
    // 업데이트된 최근 검색기록으로 로컬스토리지를 업데이트 합니다.
    localStorage.setItem(
      'recentSearchHistory',
      JSON.stringify(updatedRecentSearchHistory),
    );
  };

  useEffect(() => {
    // 로컬스토리지에서 최근 검색기록, 즐겨찾기 값을 가져와서 null이 아니라면 상태를 업데이트 합니다.
    const localRecentSearchHistory = localStorage.getItem(
      'recentSearchHistory',
    );
    const localFavoriteSearchHistory = localStorage.getItem(
      'favoriteSearchHistory',
    );
    if (localRecentSearchHistory !== null) {
      setRecentSearchHistory(JSON.parse(localRecentSearchHistory));
    }
    if (localFavoriteSearchHistory !== null) {
      setFavoriteSearchHistory(JSON.parse(localFavoriteSearchHistory));
    }
  }, []);

  // 최근 검색기록 배열이 빈 값인지 검사합니다.
  const isRecentSearchHistoryEmpty = recentSearchHistory.length === 0;
  // 즐겨찾기 배열이 빈 값인지 검사합니다.
  const isFavoriteSearchHistoryEmpty = favoriteSearchHistory.length === 0;

  return (
    <>
      {isSearchInputFocus &&
        (!isRecentSearchHistoryEmpty || !isFavoriteSearchHistoryEmpty) && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn('searchHistoryContainer')}
          >
            <div>
              {!isRecentSearchHistoryEmpty && (
                <div className={cn('searchTitle')}>최근검색</div>
              )}
              {recentSearchHistory.map((history) => (
                <div
                  key={`${history.country}${history.name}${history.tag}`}
                  onClick={() =>
                    summonerSearch(history.name, history.tag, history.country)
                  }
                  className={cn('searchHistory')}
                >
                  <div className={cn('historyCountry')}>{history.country}</div>
                  <div className={cn('historyName')}>{history.name}</div>
                  <div className={cn('historyTag')}>#{history.tag}</div>
                  <div
                    className={cn('historyFavoriteButton', {
                      active: history.isFavorite,
                    })}
                    onClick={(e) => updateFavoriteSearchHistory(e, history)}
                  >
                    {history.isFavorite ? <FaBookmark /> : <FaRegBookmark />}
                  </div>
                  <div
                    onClick={(e) => deleteRecentSearchHistory(e, history)}
                    className={cn('historyDeleteButton')}
                  >
                    <IoClose />
                  </div>
                </div>
              ))}
            </div>
            <div>
              {!isFavoriteSearchHistoryEmpty && (
                <div className={cn('searchTitle')}>즐겨찾기</div>
              )}
              {favoriteSearchHistory.map((history) => (
                <div
                  key={`${history.country}${history.name}${history.tag}`}
                  onClick={() => navSummonerSearch(history)}
                  className={cn('searchHistory')}
                >
                  <div className={cn('historyCountry')}>{history.country}</div>
                  <div className={cn('historyName')}>{history.name}</div>
                  <div className={cn('historyTag')}>#{history.tag}</div>
                  <div
                    className={cn('historyFavoriteButton', {
                      active: history.isFavorite,
                    })}
                    onClick={(e) => updateFavoriteSearchHistory(e, history)}
                  >
                    {history.isFavorite ? <FaBookmark /> : <FaRegBookmark />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
}
