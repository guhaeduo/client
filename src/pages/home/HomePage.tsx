'use client';

import styles from './home.module.scss';
import classNames from 'classnames/bind';
import SearchBar from 'components/searchbar/SearchBar';
import useCustomNavigation from 'hooks/useCustomNavigation';
const cn = classNames.bind(styles);

export default function HomePage() {
  const { navHome } = useCustomNavigation();
  return (
    <div className={`${cn('homeMain', 'centerContainer')}`}>
      <div className={cn('searchArea')}>
        <div className={cn('homeSideImage')}>
          <img src={process.env.PUBLIC_URL + `/images/akali.png`} alt="" />
        </div>
        <h1 onClick={navHome}>
          <img
            src={process.env.PUBLIC_URL + '/images/logo.png'}
            alt="구해듀오 로고"
          />
        </h1>
        <SearchBar type="main" />
      </div>
    </div>
  );
}
