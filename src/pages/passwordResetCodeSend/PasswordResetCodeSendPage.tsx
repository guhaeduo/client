import styles from './passwordResetCodeSendPage.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import LOCATION from 'constants/location';
import Input from 'components/input/Input';
import { emailValidation } from 'utils/validatior';
import usePasswordResetCodeSendForm from 'hooks/form/usePasswordResetCodeSendForm';
import { FaCheckCircle } from 'react-icons/fa';
import mapKoreanEmailServiceToDomain from 'utils/mapKoreanEmailServiceToDomain';
const cn = classNames.bind(styles);

export default function PasswordResetCodeSendPage() {
  const {
    register,
    submitHandler,
    errors,
    isValid,
    isSuccess,
    error,
    getValues,
  } = usePasswordResetCodeSendForm();

  const companyDomain = mapKoreanEmailServiceToDomain(getValues('email'));
  return (
    <div className="centerContainer">
      <div className={cn('container', { isSuccess })}>
        {isSuccess ? (
          <div className={cn('successMsg')}>
            <FaCheckCircle />
            <span>이메일함을 확인하여 주세요.</span>

            <a href={`https://mail.${companyDomain}`}>바로가기</a>
          </div>
        ) : (
          <>
            <h3>비밀번호 재설정 안내</h3>
            <p>
              계정과 연결된 이메일을 입력하시면 비밀번호 재설정을 위한 링크를
              보내드립니다.
            </p>
            <form onSubmit={submitHandler}>
              <Input
                {...register('email', emailValidation)}
                type="text"
                label="이메일"
                error={errors.email}
                placeholder="이메일을 입력해주세요."
              />
              <button className={cn({ isValid })} type="submit">
                비밀번호 재설정하기
              </button>
            </form>
            <Link to={LOCATION.LOGIN}>로그인 페이지로 돌아가기</Link>
          </>
        )}
      </div>
    </div>
  );
}
