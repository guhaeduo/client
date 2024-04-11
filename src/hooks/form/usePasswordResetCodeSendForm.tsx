import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSearchParams from 'hooks/useSearchParams';
import isCustomAxiosError from 'service/isCustomAxiosError';
import instance from 'service/instance';
import emailServiceToDomain from 'utils/emailServiceToDomain';

interface FormValue {
  email: string;
}

/**
 * 비밀번호 초기화 코드 전송 폼입니다.
 * @return {UseFormRegister<FormValue>} register - 입력 필드 등록 함수
 * @return {(e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>} submitHandler - 폼 제출 핸들러
 * @return {FieldErrors<FormValue>} errors - 폼 필드의 유효성 검사 오류
 * @return {boolean} isValid - 유효성 검사 통과 여부
 * @return {boolean} isSuccess - 비밀번호 초기화 코드 전송 성공 여부
 * @return {string} companyDomain - 사용자 이메일 도메인
 */

export default function usePasswordResetCodeSendForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const getParams = useSearchParams();
  // 쿼리 문자열에서 특정 파라미터의 값을 가져옵니다.
  const emailParam = getParams('email');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm<FormValue>({
    defaultValues: {
      email: emailParam || '',
    },
  });

  /** 비밀번호 초기화 코드 요청 함수 */
  const submitHandler = handleSubmit(async (data) => {
    const { email } = data;
    try {
      // 비밀번호 초기화 코드 요청
      await instance.post('api/site/find-password', {
        email,
      });
      // 코드 전송 성공시 isSuccess true로 변경
      setIsSuccess(true);
    } catch (err) {
      // 에러 발생시 에러값 변경
      if (isCustomAxiosError(err) && err.response) {
        setError('email', {
          type: 'pattern',
          message: err.response.data.message,
        });
      }
    }
  });

  // 사용자의 이메일 도메인을 저장합니다.
  const companyDomain = emailServiceToDomain(getValues('email'));

  return {
    register,
    submitHandler,
    errors,
    isValid,
    isSuccess,
    companyDomain,
  };
}
