import React, { useEffect, useState, useRef } from 'react';
import styles from './searchBar.module.scss';
import classNames from 'classnames/bind';
import DropDown from '../dropDown/DropDown';
import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { COUNTRY } from 'constants/options';
import { IoIosSearch } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import parseSummonerName from 'utils/parseSummonerName';
import useCustomNavigation from 'hooks/useCustomNavigation';
import SearchHistoryContainer from './SearchHistoryContainer';
import getNewRecentSearchHistory from 'utils/getNewRecentSearchHistory';
import useHandleOutsideClick from 'hooks/useHandleOustsideClick';
import { useLocation } from 'react-router-dom';
import { SearchHistory } from 'types/summoner';
const cn = classNames.bind(styles);

type Props = {
  className?: string;
  type: 'header' | 'main';
};

/**
 * 소환사 검색바 입니다.
 * @param {string} className - 소환사 검색바 클래스입니다.
 * @param {'header' | 'main'} type - 검색바의 위치를 나타내는 타입입니다.
 */

export default function SearchBar({ className, type }: Props) {
  // country를 관리하는 옵션상태 및 상태 변경함수 입니다.
  const [countryOption, setCountryOption] = useSignularOptionSelector({
    defaultOption: 'kr',
  });

  // searchHistoryRef 입니다.
  const searchHistoryRef = useRef<HTMLFormElement | null>(null);

  // pathname 입니다.
  const { pathname } = useLocation();

  // 최근 검색 기록을 관리하는 상태입니다.
  const [recentSearchHistory, setRecentSearchHistory] = useState<
    SearchHistory[]
  >([]);

  // 즐겨찾기를 관리하는 상태입니다.
  const [favoriteSearchHistory, setFavoriteSearchHistory] = useState<
    SearchHistory[]
  >([]);

  // 검색 인풋이 포커스 되어있는지를 관리하는 상태이며, 검색 기록창을 보여주는 용도로 관리됩니다.
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
  // country 드롭다운이 오픈되었는지를 관리하는 상태입니다.
  const [isCountryDropDownOpen, setIsCountryDropDownOpen] = useState(false);
  const { navSummonerSearch } = useCustomNavigation();
  const { register, handleSubmit, setValue } = useForm();

  // 검색창을 클릭하였을 때, inputSearchFocus 상태를 업데이트하는 함수입니다.
  const searchInputFocusHandler = () => {
    setIsSearchInputFocus(true);
    // e.stopPropagation();
    // // 드롭다운이 열려있다면 닫습니다.
    // if (isCountryDropDownOpen) setIsCountryDropDownOpen(false);
  };

  // 드롭다운 오픈 여부를 제어하는 함수입니다.
  const modalOpenHandler = (isOpen: boolean) => {
    setIsCountryDropDownOpen(isOpen);
    // 검색기록창이 열려있다면 닫습니다.
    if (isSearchInputFocus) setIsSearchInputFocus(false);
  };

  useEffect(() => {
    // pathname이 변경된다면, searchInput의 값을 초기화 하고 InputFocus를 false로 변경합니다.
    setValue('summonerName', '');
    setIsSearchInputFocus(false);
  }, [pathname]);

  useHandleOutsideClick({
    isOpen: isSearchInputFocus,
    setIsOpen: setIsSearchInputFocus,
    ref: searchHistoryRef,
  });

  // 소환사 이름, 태그, 국가를 입력받아 소환사 검색 페이지 이동 및 최근 검색 기록을 업데이트 하는 함수입니다.
  const summonerSearch = (name: string, tag: string, country: string) => {
    const newSearch = { country, name, tag };
    const newRecentSearchHistory = getNewRecentSearchHistory(
      name,
      tag,
      country,
      recentSearchHistory,
    );
    // 전달받은 데이터를 갖고 소환사 검색 페이지로 이동합니다.
    navSummonerSearch(newSearch);
    // 최근 검색 기록 상태를 업데이트 합니다.
    setRecentSearchHistory(newRecentSearchHistory);
    // 최근 검색 기록을 로컬스토리지에 업데이트 합니다.
    localStorage.setItem(
      'recentSearchHistory',
      JSON.stringify(newRecentSearchHistory),
    );
  };

  // 소환사 검색 Form이 Submit 되었을 때 실행되는 함수입니다.
  const onSearchSubmitHandler = handleSubmit((data) => {
    try {
      const { name, tag } = parseSummonerName(
        data.summonerName.replace(/\//g, ''),
      );
      const country = countryOption;
      summonerSearch(name, tag, country);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  });
  // 타입이 Header인지 여부를 관리하는 변수입니다.
  const isHeader = type === 'header';

  return (
    <div className={cn(className, 'searchBarWrapper')}>
      <div className={cn('searchBar', type)}>
        <DropDown
          currentOptionKey={countryOption}
          onChange={setCountryOption}
          options={COUNTRY}
          type="dark"
          className={cn('searchBarDropDown', {
            header: isHeader,
            main: !isHeader,
          })}
          isOpen={isCountryDropDownOpen}
          setIsOpen={modalOpenHandler}
        />
        <form ref={searchHistoryRef} onSubmit={onSearchSubmitHandler}>
          <input
            type="text"
            className={cn('searchInput')}
            {...register('summonerName')}
            autoComplete="off"
            onClick={searchInputFocusHandler}
          />
          <button type="submit" className={cn('submitButton', type)}>
            <IoIosSearch />
          </button>
        </form>
      </div>
      <SearchHistoryContainer
        isSearchInputFocus={isSearchInputFocus}
        recentSearchHistory={recentSearchHistory}
        favoriteSearchHistory={favoriteSearchHistory}
        setFavoriteSearchHistory={setFavoriteSearchHistory}
        setRecentSearchHistory={setRecentSearchHistory}
        summonerSearch={summonerSearch}
      />
    </div>
  );
}
