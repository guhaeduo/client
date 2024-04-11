import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { COUNTRY } from 'constants/options';
import { IoIosSearch } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import parseSummonerName from 'utils/parseSummonerName';
import useCustomNavigation from 'hooks/useCustomNavigation';
import getNewRecentSearchHistory from 'utils/getNewRecentSearchHistory';
import useHandleOutsideClick from 'hooks/useHandleOustsideClick';
import { SearchHistory } from 'types/summoner';
import Toast from 'utils/toast';
import SearchHistoryContainer from './SearchHistoryContainer';
import DropDown from '../dropDown/DropDown';
import styles from './searchBar.module.scss';

const cn = classNames.bind(styles);

type Props = {
  className?: string;
  type: 'header' | 'main';
};

/**
 * 소환사 검색바를 렌더링 합니다.
 * @param {string} className - 클래스네임 입니다. (선택 사항)
 * @param {'header' | 'main'} type - 검색바 컴포넌트가 어디에 위치하는지를 나타내는 컴포넌트 입니다.
 * @return 소환사 검색바
 */

export default function SearchBar({ className, type }: Props) {
  // 소환사의 검색 국가를 관리하는 옵션 및 옵션 변경함수 입니다.
  const [countryOption, setCountryOption] = useState('kr');

  // 최근 검색 기록을 관리하는 상태입니다.
  const [recentSearchHistory, setRecentSearchHistory] = useState<
    SearchHistory[]
  >([]);

  // 즐겨찾기를 관리하는 상태입니다.
  const [favoriteSearchHistory, setFavoriteSearchHistory] = useState<
    SearchHistory[]
  >([]);

  // 검색 기록창을 표시할지 관리하는 상태입니다.
  const [isSearchHistoryShow, setIsSearchHistoryShow] = useState(false);

  // 국가 선택 드롭다운이 오픈되었는지를 관리하는 상태입니다.
  const [isCountryDropDownOpen, setIsCountryDropDownOpen] = useState(false);
  const { navSummonerSearch } = useCustomNavigation();

  // 소환사 검색을 위한 form을 생성합니다.
  const { register, handleSubmit, setValue } = useForm({ mode: 'onBlur' });
  const { ref, ...rest } = register('summonerName');

  // 검색 기록창의 참조값 입니다.
  const searchHistoryRef = useRef<HTMLFormElement | null>(null);

  // 검색 인풋의 참조값 입니다.
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // 검색창을 클릭하면 검색 기록을 표시합니다.
  const searchInputFocusHandler = () => {
    setIsSearchHistoryShow(true);
  };

  // ref에 등록된 요소 외의 영역 클릭시 검색기록창을 닫습니다.
  useHandleOutsideClick({
    isOpen: isSearchHistoryShow,
    setIsOpen: setIsSearchHistoryShow,
    ref: searchHistoryRef,
  });

  /**
   * 소환사 검색 함수입니다.
   * @param {string} name - 소환사 이름
   * @param {string} tag - 소환사 태그
   * @param {string} country - 소환사 검색 국가
   */

  const summonerSearch = (name: string, tag: string, country: string) => {
    const newSearch = { country, name, tag };
    const newRecentSearchHistory = getNewRecentSearchHistory(
      name,
      tag,
      country,
      recentSearchHistory,
      favoriteSearchHistory,
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
    // 검색 인풋을 초기화 합니다.
    setValue('summonerName', '');
    // 검색 기록창을 닫고 블러처리 합니다.
    setIsSearchHistoryShow(false);
    searchInputRef.current?.blur();
  };

  // 소환사 검색 Form이 Submit 되었을 때 실행되는 함수입니다.
  const onSearchSubmitHandler = handleSubmit((data) => {
    try {
      const { name, tag } = parseSummonerName(
        data.summonerName.replace(/\//g, ''),
      );
      // 소환사 검색 함수를 호출합니다.
      summonerSearch(name, tag, countryOption);
    } catch (err) {
      if (err instanceof Error)
        Toast.info(err.message, { toastId: 'summonerSearchInfo' });
    }
  });

  // 타입이 Header인지 여부를 관리하는 변수입니다.
  const isHeader = type === 'header';

  return (
    <div className={cn(className, 'searchBarWrapper')}>
      <div className={cn('searchBar', type)}>
        <DropDown
          label="소환사 검색 국가 선택 메뉴"
          currentOptionKey={countryOption}
          onChange={setCountryOption}
          options={COUNTRY}
          type="dark"
          className={cn('searchBarDropDown', {
            header: isHeader,
            main: !isHeader,
          })}
          isOpen={isCountryDropDownOpen}
          setIsOpen={setIsCountryDropDownOpen}
        />
        <form ref={searchHistoryRef} onSubmit={onSearchSubmitHandler}>
          <label className="visuallyHidden" htmlFor="summonerSearchInput">
            소환사 검색 인풋
          </label>
          <input
            type="text"
            id="summonerSearchInput"
            className={cn('searchInput')}
            {...rest}
            ref={(e) => {
              ref(e);
              searchInputRef.current = e;
            }}
            autoComplete="off"
            onClick={searchInputFocusHandler}
          />
          <button
            type="submit"
            id="summonerSearchBtn"
            className={cn('submitButton', type)}
          >
            <IoIosSearch />
            <span className="visuallyHidden">소환사 검색 버튼</span>
          </button>
        </form>
      </div>
      <SearchHistoryContainer
        isSearchInputFocus={isSearchHistoryShow}
        recentSearchHistory={recentSearchHistory}
        favoriteSearchHistory={favoriteSearchHistory}
        setFavoriteSearchHistory={setFavoriteSearchHistory}
        setRecentSearchHistory={setRecentSearchHistory}
        summonerSearch={summonerSearch}
      />
    </div>
  );
}
