import styles from './passwordChangeModal.module.scss';
import classNames from 'classnames/bind';
import Input from 'components/input/Input';
import usePasswordChangeForm from 'hooks/form/usePasswordChangeForm';
import { FaCheck } from 'react-icons/fa6';
const cn = classNames.bind(styles);

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PasswordChangeModal({ setIsModalOpen }: Props) {
  const {
    register,
    submitHandler,
    isLengthValid,
    isHasAlphaNumericValid,
    isMatch,
    isDiffrentValid,
    isValid,
  } = usePasswordChangeForm({ setIsModalOpen });

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
        <div className={cn('buttons')}>
          <button
            className={cn('cancelBtn')}
            onClick={() => setIsModalOpen(false)}
            type="button"
          >
            취소
          </button>
          <button
            className={cn({
              greenBtn: isValid,
              disabledBtn: !isValid,
            })}
            type="submit"
          >
            비밀번호 재설정하기
          </button>
        </div>
      </form>
    </div>
  );
}
