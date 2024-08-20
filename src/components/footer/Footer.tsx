import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PATH from 'constants/path';
import styles from './footer.module.scss';

const cn = classNames.bind(styles);

/**
 * 페이지 하단에 푸터 요소를 렌더링 합니다.
 * @return 페이지 정보 요소
 */

export default function Footer() {
  return (
    <footer className={cn('footer')}>
      <div>
        <Link to={PATH.privacyPolicy} target="_blank">
          개인정보처리방침
        </Link>
        <Link to={PATH.teamOfUse} target="_blank">
          이용약관
        </Link>
      </div>
      <p>
        GuhaeDuo isn’t endorsed by Riot Games and doesn’t reflect the views or
        opinions of Riot Games or anyone officially involved in producing or
        managing League of Legends.
      </p>
    </footer>
  );
}
