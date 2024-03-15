import React from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function Footer() {
  return (
    <footer className={cn('footer')}>
      <p>
        GuhaeDuo isn’t endorsed by Riot Games and doesn’t reflect the views or
        opinions of Riot Games or anyone officially involved in producing or
        managing League of Legends.
      </p>
      <h1>
        <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="" />
      </h1>
    </footer>
  );
}
