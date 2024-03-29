import styles from './passwordResetCodeSendPage.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PATH from 'constants/path';
import Input from 'components/common/input/Input';
import { emailValidation } from 'utils/validator';
import usePasswordResetCodeSendForm from 'hooks/form/usePasswordResetCodeSendForm';
import { FaCheckCircle } from 'react-icons/fa';
import emailServiceToDomain from 'utils/emailServiceToDomain';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';

const cn = classNames.bind(styles);

export default function PasswordResetCodeSendPage() {
  const { register, submitHandler, errors, isValid, isSuccess, getValues } =
    usePasswordResetCodeSendForm();

  const companyDomain = emailServiceToDomain(getValues('email'));
  return (
    <>
      <SEOMeta pageData={SEO_DATA.passwordResetCodeSend} />
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
                  autoFocus
                />
                <button className={cn({ isValid })} type="submit">
                  비밀번호 재설정하기
                </button>
              </form>
              <Link to={PATH.LOGIN}>로그인 페이지로 돌아가기</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
