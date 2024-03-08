import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface FormValue {
  email: string;
  verificationCode: string;
  password: string;
  passwordCheck: string;
}

export default function useSignupForm() {
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
    setError,
  } = useForm<FormValue>({ mode: 'onChange' });

  const isEmailiValid = watch('email') && !errors.email;

  const verificationCodeSendHandler = () => {
    if (!isEmailiValid) {
      setError('email', {
        type: 'pattern',
        message: '올바른 이메일 주소를 입력하세요.',
      });
      return;
    }
    setIsVerificationCodeSent(true);
  };

  const submitHandler = handleSubmit((data) => {
    const { email, password } = getValues();
    { email, password, data }, 'hello');
  });

  return {
    isVerificationCodeSent,
    verificationCodeSendHandler,
    register,
    submitHandler,
    errors,
    watch,
    isValid,
    isEmailiValid,
  };
}
