import classNames from 'classnames/bind';
import useCustomNavigation from 'hooks/useCustomNavigation';
import Input from 'components/common/input/Input';
import useSignupForm from 'hooks/form/useSignupForm';
import {
  emailValidation,
  passwordValidation,
  verificationCodeValidation,
} from 'utils/validator';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';
import styles from './signupPage.module.scss';

const cn = classNames.bind(styles);
export default function SignupPage() {
  const { navLogin } = useCustomNavigation();

  const {
    isVerificationCodeSent,
    verificationCodeSendHandler,
    verificationCodeConfirmation,
    register,
    submitHandler,
    errors,
    watch,
    isValid,
    isEmailiValid,
    isVerficationCodeValid,
    isVerificationConfirm,
  } = useSignupForm();

  return (
    <>
      <SEOMeta pageData={SEO_DATA.signup} />
      <div className="centerContainer">
        <div className={cn('main', 'container')}>
          <img
            className={cn('signupImg')}
            src={`${process.env.PUBLIC_URL}/images/thresh.png`}
            alt=""
          />
          <div className={cn('signupContainer')}>
            <div className={cn('signupWrapper')}>
              <h3>회원가입</h3>
              <form onSubmit={submitHandler}>
                <div className={cn('emailInputWrapper')}>
                  <Input
                    {...register('email', emailValidation)}
                    type="text"
                    label="이메일"
                    error={errors.email}
                    disabled={isVerificationConfirm}
                    autoFocus
                  />
                  {isVerificationConfirm || (
                    <button
                      type="button"
                      className={cn('verificationCodeBtn', {
                        isValid: isEmailiValid,
                        success: isVerificationConfirm,
                      })}
                      onClick={verificationCodeSendHandler}
                    >
                      인증번호 받기
                    </button>
                  )}
                </div>
                {isVerificationCodeSent && !isVerificationConfirm && (
                  <p className={cn('verificationCodeSentMessage')}>
                    인증 번호가 전송되었습니다.(유효시간 30분) <br />
                    인증 번호가 오지 않으면 입력하신 정보가 정확한지 확인하여
                    주세요.
                  </p>
                )}
                <div className={cn('emailInputWrapper')}>
                  <Input
                    {...register(
                      'verificationCode',
                      verificationCodeValidation,
                    )}
                    type="text"
                    label="인증번호"
                    error={errors.verificationCode}
                    disabled={!isVerificationCodeSent || isVerificationConfirm}
                  />
                  {isVerificationConfirm || (
                    <button
                      type="button"
                      className={cn('verificationCodeBtn', {
                        isValid: isVerficationCodeValid,
                      })}
                      onClick={verificationCodeConfirmation}
                    >
                      인증번호 확인
                    </button>
                  )}
                </div>
                <Input
                  {...register('password', passwordValidation)}
                  type="password"
                  label="비밀번호"
                  error={errors.password}
                />
                <Input
                  {...register('passwordCheck', {
                    validate: (value: string) =>
                      value === watch('password') ||
                      '비밀번호가 일치하지 않습니다.',
                  })}
                  type="password"
                  label="비밀번호 재확인"
                  error={errors.passwordCheck}
                />
                <button className={cn('signupBtn', { isValid })} type="submit">
                  회원가입
                </button>
              </form>
              <p className={cn('toLogin')}>
                이미 구해듀오의 회원이신가요?
                <span onClick={navLogin}>로그인</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
