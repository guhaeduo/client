import { useState, MouseEventHandler, useRef } from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import useCustomNavigation from 'hooks/useCustomNavigation';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineProfile } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { logout } from 'store/userSlice';
import { Link } from 'react-router-dom';
import useHandleOutsideClick from 'hooks/useHandleOustsideClick';
import LOCATION from 'constants/location';
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
const HEADER_HIDDEN_PATH = ['oauth'];
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
  const user = useSelector(selectUser);
  const dispath = useDispatch();
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const { navHome, navLogin, navFindDuo } = useCustomNavigation();

  // userMenu의 open 여부를 제어하는 함수입니다.
  const userMenuButtonOnClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen((prevOption) => !prevOption);
  };

  // 외부 클릭시 메뉴창 닫기
  useHandleOutsideClick({
    isOpen: isUserMenuOpen,
    setIsOpen: setIsUserMenuOpen,
    ref: userMenuRef,
  });
  // userMenu 로그아웃 함수입니다.
  const logoutOnClick = () => {
    dispath(logout());
  };
  if (HEADER_HIDDEN_PATH.includes(firstPathname)) return null;

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
                  <BsThreeDots onClick={userMenuButtonOnClick} />
                </div>
                {isUserMenuOpen && (
                  <div ref={userMenuRef} className={cn('userMenuContainer')}>
                    <Link to={LOCATION.PROFILE} className={cn('userMenu')}>
                      <span>프로필</span>
                      <AiOutlineProfile size={17} />
                    </Link>
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
