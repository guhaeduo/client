import React from 'react';
import styles from './signupPage.module.scss';
import classNames from 'classnames/bind';
import LoadingButton from 'components/loadingButton/LoadingButton';
import useCustomNavigation from 'hooks/useCustomNavigation';

const cn = classNames.bind(styles);
export default function SignupPage() {
  const { navLogin } = useCustomNavigation();
  return (
    <div className={cn('main', 'container')}>
      <div className={cn('signupImg')}>
        <img src={process.env.PUBLIC_URL + '/images/thresh.png'} alt="" />
      </div>
      <div>
        <div className={cn('signupWrapper')}>
          <h3>회원가입</h3>
          <form>
            <div className={cn('emailInputWrapper')}>
              <input type="email" />
              <button type="button">인증번호 요청</button>
            </div>
            <div className={cn('verificationCodeInputWrapper')}>
              <input type="text" />
              <button type="button">인증번호 확인</button>
            </div>
            <input type="password" />
            <input type="password" />
            <LoadingButton
              type="submit"
              isFetching={false}
              className={cn('signupBtn')}
              onClickHandler={() => console.log('회원가입')}
            >
              회원가입
            </LoadingButton>
          </form>
          <p>
            이미 구해듀오의 회원이신가요?
            <span onClick={navLogin}>로그인</span>
          </p>
        </div>
      </div>
    </div>
  );
}
