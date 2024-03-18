import styles from './resetPasswordPage.module.scss';
import classNames from 'classnames/bind';
import useResetPasswordForm from 'hooks/form/useResetPasswordForm';
import { FaCheck } from 'react-icons/fa6';
import Input from 'components/input/Input';
import ErrorComponent from 'components/errorComponent/ErrorComponent';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';
const cn = classNames.bind(styles);

export default function ResetPasswordPage() {
  const {
    register,
    submitHandler,
    isLengthValid,
    isHasAlphaNumericValid,
    isMatch,
    error,
  } = useResetPasswordForm();

  return (
    <>
      <SEOMeta pageData={SEO_DATA.resetPassword} />
      <div className="centerContainer">
        {error ? (
          <ErrorComponent centered errorMessage={error} />
        ) : (
          <div className={cn('resetPasswordContainer')}>
            <h3>신규 비밀번호 입력</h3>
            <form onSubmit={submitHandler}>
              <Input
                label="신규 비밀번호"
                type="password"
                {...register('newPassword')}
              />
              <Input
                label="신규 비밀번호 재확인"
                type="password"
                {...register('newPasswordCheck')}
              />
              <div className={cn('passwordValidatons')}>
                <p>비밀번호 요구사항</p>
                <div
                  className={cn('passwordValidation', {
                    isValid: isLengthValid,
                  })}
                >
                  <FaCheck /> 8글자 이상
                </div>
                <div
                  className={cn('passwordValidation', {
                    isValid: isHasAlphaNumericValid,
                  })}
                >
                  <FaCheck /> 영문, 숫자 조합
                </div>
                <div className={cn('passwordValidation', { isValid: isMatch })}>
                  <FaCheck /> 비밀번호 재입력 일치
                </div>
              </div>
              <button
                className={cn({
                  isValid: isLengthValid && isHasAlphaNumericValid && isMatch,
                })}
                type="submit"
              >
                비밀번호 재설정하기
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
