import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSearchParams from 'hooks/useSearchParams';
import isCustomAxiosError from 'service/isCustomAxiosError';
import instance from 'service/instance';

interface FormValue {
  email: string;
}

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

  const submitHandler = handleSubmit(async (data) => {
    const { email } = data;
    try {
      // 이메일 전송 요청 및 응답
      // 이메일 전송 성공시 isSuccess
      await instance.post('api/site/find-password', {
        email,
      });
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

  return {
    register,
    submitHandler,
    errors,
    isValid,
    isSuccess,
    getValues,
  };
}
