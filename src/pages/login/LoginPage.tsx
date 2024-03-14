import styles from './loginPage.module.scss';
import classNames from 'classnames/bind';
import useCustomNavigation from 'hooks/useCustomNavigation';
import { emailValidation, passwordValidation } from 'utils/validatior';
import { RiDiscordFill } from 'react-icons/ri';
import LOCATION from 'constants/location';
import Input from 'components/input/Input';
import useLoginForm from 'hooks/form/useLoginForm';
const cn = classNames.bind(styles);

export default function LoginPage() {
  const { navSignup, navResetPassword } = useCustomNavigation();
  const { register, submitHandler, errors, isValid, getValues } =
    useLoginForm();

  const onClickKakaoBtnHandler = () =>
    (window.location.href = LOCATION.KAKAO_AUTH_URL);
  const onClickDiscordBtnHandler = () =>
    (window.location.href = LOCATION.DISCORD_AUTH_URL);

  return (
    <div className="centerContainer">
      <div>
        <div className={cn('loginWrapper')}>
          <h3>로그인</h3>
          <form onSubmit={submitHandler}>
            <Input
              {...register('email', emailValidation)}
              label="이메일"
              className={cn('idInput')}
              type="text"
              error={errors.email}
            />
            <Input
              {...register('password', passwordValidation)}
              label="비밀번호"
              className={cn('passwordInput')}
              type="password"
              error={errors.password}
            />
            <span
              className={cn('forgotPasswordBtn')}
              onClick={() => navResetPassword(getValues('email'))}
            >
              비밀번호를 까먹으셨나요?
            </span>
            <button className={cn('loginBtn', { isValid })}>로그인</button>
          </form>
          <div className={cn('middleLine')} />
          <button
            className={cn('kakaoLoginBtn')}
            onClick={onClickKakaoBtnHandler}
          >
            <svg viewBox="0 0 24 24">
              <path d="M11.998 4c-5.387 0-9.753 3.443-9.753 7.69 0 2.746 1.826 5.158 4.572 6.516-.15.515-.96 3.314-.992 3.535 0 0-.02.165.087.227a.295.295 0 00.232.015c.308-.044 3.564-2.327 4.127-2.72.572.08 1.15.118 1.727.117 5.387 0 9.754-3.443 9.754-7.69S17.384 4 11.998 4z" />
            </svg>
            카카오로 시작하기
          </button>
          <button
            className={cn('discordLoginBtn')}
            onClick={onClickDiscordBtnHandler}
          >
            <RiDiscordFill /> 디스코드로 시작하기
          </button>
          <p>
            아직 구해듀오의 회원이 아니신가요?
            <span onClick={navSignup}>회원가입</span>
          </p>
        </div>
      </div>
    </div>
  );
}
