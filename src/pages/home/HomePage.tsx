import classNames from 'classnames/bind';
import SearchBar from 'components/common/searchbar/SearchBar';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';
import styles from './home.module.scss';

const cn = classNames.bind(styles);

/** 메인 페이지 */
export default function HomePage() {
  return (
    <>
      <SEOMeta pageData={SEO_DATA.home} />
      <div className={`${cn('homeMain', 'centerContainer')}`}>
        <div className={cn('searchArea')}>
          <div className={cn('homeSideImage')}>
            <img src={`${process.env.PUBLIC_URL}/images/akali.png`} alt="" />
          </div>
          <h1>
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="구해듀오 로고"
            />
          </h1>
          <SearchBar type="main" />
        </div>
      </div>
    </>
  );
}
