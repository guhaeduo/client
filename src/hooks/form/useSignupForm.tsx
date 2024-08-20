import { useForm } from 'react-hook-form';
import { useState } from 'react';
import instance from 'service/instance';
import useCustomNavigation from 'hooks/useCustomNavigation';
import isCustomAxiosError from 'service/isCustomAxiosError';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';

interface FormValue {
  email: string;
  verificationCode: string;
  password: string;
  passwordCheck: string;
}

/**
 * 회원가입 폼입니다.
 * @return {UseFormRegister<FormValue>} register - 입력 필드 등록 함수
 * @return {(e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>} submitHandler - 폼 제출 핸들러
 * @return {FieldErrors<FormValue>} errors - 폼 필드의 유효성 검사 오류
 * @return {boolean} isValid - 폼의 유효성 검사 통과 여부
 * @return {boolean} isVerificationCodeSent - 회원가입 인증코드 발송 여부
 * @return {boolean} isVerificationConfirm - 회원 가입 인증코드 인증 여부
 * @return {boolean} verificationCodeSendHandler - 회원가입 인증코드 발송 함수
 * @return {boolean} verificationCodeConfirmation - 회원가입 인증코드 인증 함수
 * @return {boolean} watch - 폼 데이터 확인 함수
 * @return {boolean} isEmailiValid - 이메일 유효성 검사 통과 여부
 * @return {boolean} isVerficationCodeValid - 인증코드 유효성 검사 통과 여부
 * @return {boolean} errorMsg - 회원가입 에러 메세지
 */

export default function useSignupForm() {
  // 회원가입 인증코드 발송 여부
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

  // 회원 가입 인증코드 인증 여부
  const [isVerificationConfirm, setIsVerificationCodeConfirm] = useState(false);

  // 회원가입을 위한 폼 생성
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
    setError,
  } = useForm<FormValue>({ mode: 'onChange' });

  // 로그인 페이지 이동 함수
  const { navLogin } = useCustomNavigation();

  // 이메일 유효성 검사 통과 여부
  const isEmailiValid = watch('email') && !errors.email;

  // 인증코드 유효성 검사 통과 여부
  const isVerficationCodeValid = watch('verificationCode')?.length === 6;

  // 폼의 이메일 데이터를 감시합니다.
  const email = watch('email');

  // 이메일 에러 발생 함수입니다.
  const emailValidHandler = () => {
    setError('email', {
      type: 'pattern',
      message: '올바른 이메일 주소를 입력하세요.',
    });
  };

  /**
   * 회원가입 인증코드 발송 함수입니다.
   */

  const verificationCodeSendHandler = async () => {
    if (!isEmailiValid) {
      // 이메일 유효성 검사를 통과하지 못한다면, 이메일 에러를 발생시키고 함수를 종료합니다.
      emailValidHandler();
      return;
    }

    try {
      // 이메일과 함께 인증코드 발송을 서버로 요청합니다.
      await instance.post('/api/site/email-code/request', {
        email,
      });
      // 인증 코드 발송을 성공했다면 인증 코드 전송 여부를 true로 변경합니다.
      setIsVerificationCodeSent(true);
    } catch (err) {
      // 인증코드 발송을 실패했다면 이메일 에러를 발생시킵니다.
      if (isCustomAxiosError(err) && err.response) {
        setError('email', {
          type: 'pattern',
          message: err.response.data.message,
        });
      }
    }
  };

  /**
   * 회원가입 인증코드 인증 함수입니다.
   */

  const verificationCodeConfirmation = async () => {
    if (!isEmailiValid) {
      // 이메일 유효성 검사를 통과하지 못한다면, 이메일 에러를 발생시키고 함수를 종료합니다.
      emailValidHandler();
      return;
    }
    try {
      // 폼 데이터에서 인증코드를 꺼내옵니다.
      const { verificationCode } = getValues();
      await instance.post('/api/site/email-code/verify', {
        email,
        code: verificationCode,
      });
      // 인증코드 인증을 성공했다면 인증 코드 인증여부를 true로 변경합니다.
      setIsVerificationCodeConfirm(true);
      // 인증코드 인증을 성공했다면 인증 성공 토스트를 띄워줍니다.
      Toast.success(MESSAGE.verificationCodeConfirmSuccess);
    } catch (err) {
      // 인증코드 인증을 실패했다면 인증코드 에러를 발생시킵니다.
      if (isCustomAxiosError(err) && err.response) {
        setError('verificationCode', {
          type: 'pattern',
          message: err.response.data.message,
        });
      }
    }
  };

  /**
   * 회원가입 요청 함수입니다.
   */

  const submitHandler = handleSubmit(async (data) => {
    // 폼 데이터에서 비밀번호를 꺼내옵니다.
    const { password } = data;
    if (!isVerificationConfirm) {
      // 인증코드 인증이 되지 않았다면 인증코드 에러를 발생시키고 함수를 종료합니다.
      setError('verificationCode', {
        type: 'pattern',
        message: '인증번호 인증을 먼저 완료해주세요.',
      });
      return;
    }
    try {
      // 이메일과 패스워드와 함께 서버로 회원가입 요청을 보냅니다.
      await instance.post('/api/site/signup', { email, password });
      // 회원가입에 성공했다면 로그인 페이지로 이동시킵니다.
      navLogin();
    } catch (err) {
      // 회원가입에 실패했다면 에러 토스트를 띄워줍니다.
      if (isCustomAxiosError(err)) {
        Toast.error(err.response?.data.message);
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
  };
}
