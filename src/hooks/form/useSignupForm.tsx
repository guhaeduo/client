import { useForm } from 'react-hook-form';
import { useState } from 'react';
import instance from 'service/instance';
import useCustomNavigation from 'hooks/useCustomNavigation';
import isCustomAxiosError from 'service/customAxiosError';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
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
  const { navLogin } = useCustomNavigation();
  const isEmailiValid = watch('email') && !errors.email;
  const isVerficationCodeValid = watch('verificationCode');
  const email = watch('email');
  const emailValidHandler = () => {
    setError('email', {
      type: 'pattern',
      message: '올바른 이메일 주소를 입력하세요.',
    });
  };
  const verificationCodeSendHandler = async () => {
    if (!isEmailiValid) {
      emailValidHandler();
      return;
    }
    try {
      await instance.post('/api/site/email-code/request', {
        email,
      });
      setIsVerificationCodeSent(true);
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        setError('email', {
          type: 'pattern',
          message: err.response.data.message,
        });
      }
    }
  };

  const verificationCodeConfirmation = async () => {
    if (!isEmailiValid) {
      emailValidHandler();
      return;
    }
    try {
      const { verificationCode } = getValues();
      await instance.post('/api/site/email-code/verify', {
        email,
        code: verificationCode,
      });
      setIsVerificationCodeConfirm(true);
      Toast.success(MESSAGE.VERIFICATION_CODE_CONFIRM_SUCCESS);
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
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
      navLogin();
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
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
