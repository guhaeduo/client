import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PATH from 'constants/path';
import styles from './footer.module.scss';

const cn = classNames.bind(styles);

/**
 * 미리 스타일을 지정해둔 푸터입니다.
 */

export default function Footer() {
  return (
    <footer className={cn('footer')}>
      <div>
        <Link to={PATH.PRIVACY_POLICY} target="_blank">
          개인정보처리방침
        </Link>
        <Link to={PATH.TEAM_OF_USE}>이용약관</Link>
      </div>
      <p>
        GuhaeDuo isn’t endorsed by Riot Games and doesn’t reflect the views or
        opinions of Riot Games or anyone officially involved in producing or
        managing League of Legends.
      </p>
    </footer>
  );
}
