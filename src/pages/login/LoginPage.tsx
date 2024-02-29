import styles from './loginPage.module.scss';
import classNames from 'classnames/bind';
import useCustomNavigation from 'hooks/useCustomNavigation';
import { emailValidation, passwordValidation } from 'utils/validatior';
import { RiDiscordFill } from 'react-icons/ri';
import LOCATION from 'constants/location';
import Input from 'components/input/Input';
import useLoginForm from 'hooks/business/useLoginForm';
const cn = classNames.bind(styles);

export default function LoginPage() {
  const { navSignup, navResetPassword } = useCustomNavigation();
  const { register, submitHandler, errors } = useLoginForm();
  const onclickKakaoBtnHandler = () =>
    (window.location.href = LOCATION.KAKAO_AUTH_URL);

  return (
    <div className={cn('main', 'container')}>
      <div className={cn('loginWrapper')}>
        <h3>로그인</h3>
        <form onSubmit={submitHandler}>
          <Input
            {...register('email', emailValidation)}
            label="이메일"
            name="email"
            className={cn('idInput')}
            type="text"
            error={errors.email}
          />
          <Input
            {...register('password', passwordValidation)}
            label="비밀번호"
            name="password"
            type="password"
            error={errors.password}
          />
          <span
            className={cn('forgotPasswordBtn')}
            onClick={() => navResetPassword()}
          >
            비밀번호를 까먹으셨나요?
          </span>
          <button className={cn('loginBtn')}>로그인</button>
        </form>
        <div className={cn('middleLine')} />
        <button
          className={cn('kakaoLoginBtn')}
          onClick={onclickKakaoBtnHandler}
        >
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
