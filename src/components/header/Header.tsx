import React from 'react';
import classNames from 'classnames/bind';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import PATH from 'constants/path';
import SearchBar from '../common/searchbar/SearchBar';
import styles from './header.module.scss';

const cn = classNames.bind(styles);

const {
  home: HOME,
  login: LOGIN,
  signup: SIGN_UP,
  profile: PROFILE,
  kakaoLogin: KAKAO_LOGIN_PAGE,
  discordLogin: DISCORD_LOGIN_PAGE,
  resetPassword: RESET_PASSWORD,
  resetPasswordEmailSend: RESET_PASSWORD_EMAIL_SEND,
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
 * 페이지 상단에 헤더 요소를 렌더링 합니다.
 * @return 헤더
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

  return (
    <header
      className={cn('header', { transparent: isLogoHidden || isButtonsHidden })}
    >
      <div className={`${cn('container')} container`}>
        {isLogoHidden || (
          <h1 className={cn('title')}>
            <Link to={PATH.home}>
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="구해듀오 로고"
              />
            </Link>
          </h1>
        )}
        {isSearchBarHidden || (
          <SearchBar
            type="header"
            className={cn('searchBar', { hidden: isSearchBarHidden })}
          />
        )}
        {isButtonsHidden || (
          <div hidden={isButtonsHidden} className={cn('buttons')}>
            <Link to={PATH.findDuo} className={cn('findDuoBtn')}>
              듀오찾기
            </Link>
            {user.isLogin ? (
              <Link to={PATH.profile} className={cn('myPageBtn')}>
                프로필
              </Link>
            ) : (
              <Link to={PATH.login} className={cn('loginBtn')}>
                로그인
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
