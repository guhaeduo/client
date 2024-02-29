import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

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
  } = useForm<FormValue>();

  const verificationCodeSendHandler = () => {
    setIsVerificationCodeSent(true);
  };

  const submitHandler = handleSubmit((data) => {
    const { email, password } = getValues();
    console.log({ email, password, data }, 'hello');
  });

  return {
    isVerificationCodeSent,
    verificationCodeSendHandler,
    register,
    submitHandler,
    errors,
    watch,
    isValid,
  };
}
