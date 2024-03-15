import styles from './passwordChangeModal.module.scss';
import classNames from 'classnames/bind';
import Input from 'components/input/Input';
import usePasswordChangeForm from 'hooks/form/usePasswordChangeForm';
import { FaCheck } from 'react-icons/fa6';
import hasAlphaNumeric from 'utils/hasAlphaNumeric';
const cn = classNames.bind(styles);

export default function PasswordChangeModal() {
  const { register, submitHandler, watch } = usePasswordChangeForm();

  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');
  const newPasswordCheck = watch('newPasswordCheck');

  const isLengthValid = newPassword?.length > 7;
  const isHasAlphaNumericValid = hasAlphaNumeric(newPassword);
  const isMatch = newPassword && newPassword === newPasswordCheck;
  const isDiffrentValid =
    newPassword?.length > 7 &&
    currentPassword?.length > 7 &&
    currentPassword !== newPassword;

  return (
    <div className={cn('container')}>
      <h3>비밀번호 재설정</h3>
      <form onSubmit={submitHandler}>
        <Input
          label="현재 비밀번호"
          type="password"
          {...register('currentPassword')}
        />
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
          <div className={cn('passwordValidation', { isValid: isLengthValid })}>
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
          <div
            className={cn('passwordValidation', { isValid: isDiffrentValid })}
          >
            <FaCheck /> 현재 비밀번호와 다른 비밀번호
          </div>
        </div>
        <button
          className={cn({
            isValid:
              isLengthValid &&
              isHasAlphaNumericValid &&
              isMatch &&
              isDiffrentValid,
          })}
          type="submit"
        >
          비밀번호 재설정하기
        </button>
      </form>
    </div>
  );
}
