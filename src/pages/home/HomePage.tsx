'use client';

import styles from './home.module.scss';
import classNames from 'classnames/bind';
import SearchBar from 'components/searchbar/SearchBar';
import useCustomNavigation from 'hooks/useCustomNavigation';
const cn = classNames.bind(styles);

export default function HomePage() {
  const { navHome } = useCustomNavigation();
  return (
    <div className={`${cn('homeMain')} container`}>
      <div className={cn('homeSideImage')}>
        <img src={process.env.PUBLIC_URL + `/images/akali.png`} alt="" />
      </div>
      <div className={cn('searchArea')}>
        <h1 onClick={navHome}>구해듀오</h1>
        <SearchBar type="main" />
      </div>
    </div>
  );
}
