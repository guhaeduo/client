import styles from './loginPage.module.scss';
import classNames from 'classnames/bind';
import useCustomNavigation from 'hooks/useCustomNavigation';
import LoadingButton from 'components/loadingButton/LoadingButton';
import { RiDiscordFill } from 'react-icons/ri';
const cn = classNames.bind(styles);

export default function LoginPage() {
  const { navSignup, navResetPassword } = useCustomNavigation();
  return (
    <div className={cn('main', 'container')}>
      <div className={cn('loginWrapper')}>
        <h3>로그인</h3>
        <form>
          <input type="text" />
          <input type="text" />
          <span
            className={cn('forgotPasswordBtn')}
            onClick={() => navResetPassword()}
          >
            비밀번호를 까먹으셨나요?
          </span>
          <LoadingButton
            type="submit"
            isFetching={false}
            className={cn('loginBtn')}
            onClickHandler={() => console.log('로그인')}
          >
            로그인
          </LoadingButton>
        </form>
        <div className={cn('middleLine')} />
        <button className={cn('kakaoLoginBtn')}>
          <img
            src={process.env.PUBLIC_URL + '/images/kakaoIcon.png'}
            alt="카카오 아이콘"
          />
          카카오로 시작하기
        </button>
        <button className={cn('discordLoginBtn')}>
          <RiDiscordFill /> 디스코드로 시작하기
        </button>
        <p>
          아직 구해듀오의 회원이 아니신가요?
          <span onClick={navSignup}>회원가입</span>
        </p>
      </div>
    </div>
  );
}
