import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
interface FormValue {
  email: string;
}
export default function usePasswordResetCodeSendForm() {
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
    const { email } = getValues();
    console.log({ email }, data, 'hello');
  });

  return {
    register,
    submitHandler,
    errors,
    getValues,
    isValid,
  };
}
