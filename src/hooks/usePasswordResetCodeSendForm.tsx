import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
interface FormValue {
  email: string;
}
export default function usePasswordResetCodeSendForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // 쿼리 문자열에서 특정 파라미터의 값을 가져옵니다.
  const email = searchParams.get('email');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormValue>({
    defaultValues: {
      email: email || '',
    },
  });

  const submitHandler = handleSubmit((data) => {
    const { email } = data;
    try {
      // 이메일 전송 요청 및 응답
      // 이메일 전송 성공시 isSuccess
      setIsSuccess(true);
    } catch (err) {
      // 에러 발생시 에러값 변경
      setError('');
    }
  });

  return {
    register,
    submitHandler,
    errors,
    isValid,
    isSuccess,
    error,
    getValues,
  };
}
