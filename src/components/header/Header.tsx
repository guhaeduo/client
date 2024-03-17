import styles from './header.module.scss';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import useCustomNavigation from 'hooks/useCustomNavigation';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import PATH from 'constants/path';

const cn = classNames.bind(styles);

const {
  HOME,
  LOGIN,
  SIGN_UP,
  PROFILE,
  KAKAO_LOGIN_PAGE,
  DISCORD_LOGIN_PAGE,
  RESET_PASSWORD,
  RESET_PASSWORD_EMAIL_SEND,
} = PATH;

const AUTH = [
  KAKAO_LOGIN_PAGE,
  DISCORD_LOGIN_PAGE,
  RESET_PASSWORD,
  RESET_PASSWORD_EMAIL_SEND,
];
const LOGO_HIDDEN_PATH = [HOME];
const SEARCH_BAR_HIDDEN_PATH = [HOME, LOGIN, SIGN_UP, PROFILE, ...AUTH];
const BUTTONS_HIDDEN_PATH = [LOGIN, SIGN_UP, PROFILE, ...AUTH];

/**
 * 미리 스타일을 지정해둔 헤더입니다.
 */

export default function Header() {
  // pathname
  const { pathname } = useLocation();
  // pathname에 따라 Logo를 가릴지 여부를 결정하는 값입니다.
  const isLogoHidden = LOGO_HIDDEN_PATH.includes(pathname);
  // pathname에 따라 SearchBar를 가릴지 여부를 결정하는 값입니다.
  const isSearchBarHidden = SEARCH_BAR_HIDDEN_PATH.includes(pathname);
  // pathname에 따라 Buttons를 가릴지 여부를 결정하는 값입니다.
  const isButtonsHidden = BUTTONS_HIDDEN_PATH.includes(pathname);

  // 유저 객체입니다.
  const user = useSelector(selectUser);

  const { navHome, navLogin, navFindDuo, navProfile } = useCustomNavigation();

  return (
    <header
      className={cn('header', { transparent: isLogoHidden || isButtonsHidden })}
    >
      <div className={`${cn('container')} container`}>
        <h1 className={cn('title', { hidden: isLogoHidden })} onClick={navHome}>
          구해듀오
        </h1>
        <SearchBar
          type="header"
          className={cn('searchBar', { hidden: isSearchBarHidden })}
        />
        {isButtonsHidden || (
          <div hidden={isButtonsHidden} className={cn('buttons')}>
            <button className={cn('findDuoBtn')} onClick={navFindDuo}>
              듀오찾기
            </button>
            {user.isLogin ? (
              <button className={cn('myPageBtn')} onClick={navProfile}>
                프로필
              </button>
            ) : (
              <button className={cn('loginBtn')} onClick={navLogin}>
                로그인
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
