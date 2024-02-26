import { useState, useEffect, MouseEventHandler } from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import useCustomNavigation from 'hooks/useCustomNavigation';
import { PiUser } from 'react-icons/pi';
import { AiOutlineProfile } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import useWindowClickEvent from 'hooks/useWindowClickEvent';
const cn = classNames.bind(styles);

const LOGO_HIDDEN_PATH = [''];
const SEARCH_BAR_HIDDEN_PATH = [
  '',
  'login',
  'signup',
  'profile',
  'auth',
  'accounts',
];
const BUTTONS_HIDDEN_PATH = ['login', 'signup', 'profile', 'auth', 'accounts'];

/**
 * 미리 스타일을 지정해둔 헤더입니다.
 */

export default function Header() {
  // 로그인한 유저의 옵션창 오픈 여부
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // pathname
  const { pathname } = useLocation();
  // url에서 첫 번째 pathname을 가져옵니다.
  const firstPathname = pathname.split('/')[1];
  // pathname에 따라 Logo를 가릴지 여부를 결정하는 값입니다.
  const isLogoHidden = LOGO_HIDDEN_PATH.includes(firstPathname);
  // pathname에 따라 SearchBar를 가릴지 여부를 결정하는 값입니다.
  const isSearchBarHidden = SEARCH_BAR_HIDDEN_PATH.includes(firstPathname);
  // pathname에 따라 Buttons를 가릴지 여부를 결정하는 값입니다.
  const isButtonsHidden = BUTTONS_HIDDEN_PATH.includes(firstPathname);

  // 유저 객체입니다.
  const user = {
    isLogin: false,
  };

  const closeMenu = () => isUserMenuOpen && setIsUserMenuOpen(false);
  useWindowClickEvent(closeMenu, [isUserMenuOpen]);

  const { navHome, navLogin, navProfile, navFindDuo } = useCustomNavigation();

  // userMenu의 open 여부를 제어하는 함수입니다.
  const userMenuButtonOnClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen((prevOption) => !prevOption);
  };

  // userMenu 로그아웃 함수입니다.
  const logoutOnClick = () => {
    user.isLogin = false;
  };

  // userMenu 프로필 페이지 이동 함수입니다.
  const profileOnClick = () => {
    navProfile();
  };

  return (
    <header
      className={cn('header', { transparent: isLogoHidden || isButtonsHidden })}
    >
      <div className={`${cn('container')} container`}>
        {isLogoHidden || (
          <h1 className={cn('title')} onClick={navHome}>
            구해듀오
          </h1>
        )}
        {isSearchBarHidden || (
          <SearchBar type="header" className={cn('searchBar')} />
        )}
        {isButtonsHidden || (
          <div hidden={isButtonsHidden} className={cn('buttons')}>
            <button className={cn('findDuoButton')} onClick={navFindDuo}>
              듀오찾기
            </button>
            {user.isLogin ? (
              <div className={cn('userMenuWrapper')}>
                <div className={cn('userMenuButton')}>
                  <PiUser size={25} onClick={userMenuButtonOnClick} />
                </div>
                {isUserMenuOpen && (
                  <div className={cn('userMenuContainer')}>
                    <div className={cn('userMenu')} onClick={profileOnClick}>
                      <span>프로필</span>
                      <AiOutlineProfile size={17} />
                    </div>
                    <div className={cn('userMenu')} onClick={logoutOnClick}>
                      <span>로그아웃</span>
                      <MdLogout size={17} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className={cn('loginButton')} onClick={navLogin}>
                로그인
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
