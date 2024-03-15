import { useForm } from 'react-hook-form';
import { useState } from 'react';
import instance from 'service/instance';
import { ServerAPIErrorResponse } from 'types/Api';
import axios from 'axios';
interface FormValue {
  email: string;
  verificationCode: string;
  password: string;
  passwordCheck: string;
}

export default function useSignupForm() {
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isVerificationConfirm, setIsVerificationCodeConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
    setError,
  } = useForm<FormValue>({ mode: 'onChange' });

  const isEmailiValid = watch('email') && !errors.email;
  const isVerficationCodeValid = watch('verificationCode');
  const email = watch('email');

  const verificationCodeSendHandler = async () => {
    if (!isEmailiValid) {
      setError('email', {
        type: 'pattern',
        message: '올바른 이메일 주소를 입력하세요.',
      });
      return;
    }
    try {
      await instance.post('/api/site/email-code/request', {
        email,
      });
      setIsVerificationCodeSent(true);
    } catch (err) {
      if (axios.isAxiosError<ServerAPIErrorResponse>(err) && err.response) {
        setError('email', {
          type: 'pattern',
          message: err.response.data.message,
        });
      }
    }
  };

  const verificationCodeConfirmation = async () => {
    if (!isEmailiValid) {
      setError('email', {
        type: 'pattern',
        message: '올바른 이메일 주소를 입력하세요.',
      });
      return;
    }
    try {
      const { verificationCode } = getValues();
      await instance.post('/api/site/email-code/verify', {
        email,
        code: verificationCode,
      });
      setIsVerificationCodeConfirm(true);
    } catch (err) {
      if (axios.isAxiosError<ServerAPIErrorResponse>(err) && err.response) {
        setError('verificationCode', {
          type: 'pattern',
          message: err.response.data.message,
        });
      }
    }
  };

  const submitHandler = handleSubmit(async (data) => {
    const { email, password } = data;
    if (!isVerificationConfirm) {
      setError('verificationCode', {
        type: 'pattern',
        message: '인증번호 인증을 먼저 완료해주세요.',
      });
      return;
    }
    try {
      await instance.post('/api/site/signup', { email, password });
      alert('환영합니다.');
    } catch (err) {
      if (axios.isAxiosError<ServerAPIErrorResponse>(err) && err.response) {
        setErrorMsg(err.response.data.message);
      }
    }
  });

  return {
    isVerificationCodeSent,
    isVerificationConfirm,
    verificationCodeSendHandler,
    verificationCodeConfirmation,
    register,
    submitHandler,
    errors,
    watch,
    isValid,
    isEmailiValid,
    isVerficationCodeValid,
    errorMsg,
  };
}
