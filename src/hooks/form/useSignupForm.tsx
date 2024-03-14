import { useForm } from 'react-hook-form';
import { useState } from 'react';
import instance from 'service/instance';
interface FormValue {
  email: string;
  verificationCode: string;
  password: string;
  passwordCheck: string;
}

export default function useSignupForm() {
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isVerificationConfirm, setIsVerificationCodeConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
    setError,
  } = useForm<FormValue>({ mode: 'onChange' });

  const isEmailiValid = watch('email') && !errors.email;
  const isVerficationCodeValid =
    watch('verificationCode') && !errors.verificationCode;

  const verificationCodeSendHandler = () => {
    const { email } = getValues();
    if (!isEmailiValid) {
      setError('email', {
        type: 'pattern',
        message: '올바른 이메일 주소를 입력하세요.',
      });
      setIsVerificationCodeSent(true);
      return;
    }
    try {
      console.log(email);
      instance.post('/api/site/email-code/request', {
        email,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const verificationCodeConfirmation = () => {
    if (!isVerficationCodeValid) {
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
    console.log({ email, password, data }, 'hello');
  });

  return {
    isVerificationCodeSent,
    verificationCodeSendHandler,
    verificationCodeConfirmation,
    register,
    submitHandler,
    errors,
    watch,
    isValid,
    isEmailiValid,
    isVerficationCodeValid,
  };
}
