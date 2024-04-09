import { useForm } from 'react-hook-form';
import useSearchParams from 'hooks/useSearchParams';
import hasAlphaNumeric from 'utils/hasAlphaNumeric';
import instance from 'service/instance';
import useCustomNavigation from 'hooks/useCustomNavigation';
import isCustomAxiosError from 'service/isCustomAxiosError';
import Toast from 'utils/toast';
import { useEffect, useState } from 'react';
import MESSAGE from 'constants/message';

interface FormValue {
  newPassword: string;
  newPasswordCheck: string;
}

/**
 * 비밀번호 초기화 페이지 폼입니다.
 */

export default function useResetPasswordForm() {
  // 폼을 생성합니다.
  const { register, handleSubmit, watch } = useForm<FormValue>({
    mode: 'onChange',
  });

  // 에러를 관리하는 상태입니다.
  const [error, setError] = useState('');

  // 키 값으로 파라미터에서 값을 빼오는 함수입니다.
  const getParams = useSearchParams();

  // code라는 키 값으로 코드를 받아옵니다.
  const code = getParams('code');

  // 폼의 데이터를 실시간으로 감지하는 변수입니다.
  const newPassword = watch('newPassword');
  const newPasswordCheck = watch('newPasswordCheck');

  // 비밀번호 길이 유효성 검사 변수입니다.
  const isLengthValid = newPassword?.length > 7;
  // 비밀번호 정규식 유효성 검사 변수입니다.
  const isHasAlphaNumericValid = hasAlphaNumeric(newPassword);
  // 비밀번호와 비밀번호 재입력 유효성 검사 변수입니다.
  const isMatch = newPassword && newPassword === newPasswordCheck;

  const { navLogin } = useCustomNavigation();

  useEffect(() => {
    // 페이지에 처음 접속하였을 때, 코드가 유효하지 않다면 에러 상태를 변경합니다.
    if (!code || !code?.trim()) setError('잘못된 접근입니다.');
  }, []);

  // 비밀번호 초기화 요청 함수입니다.
  const submitHandler = handleSubmit(async () => {
    // 유효성 검사가 만족하지 않는다면 얼리 리턴합니다.
    if (!(isLengthValid && isHasAlphaNumericValid && isMatch)) return;

    try {
      // 비밀번호 초기화 요청을 보냅니다.
      await instance.patch(
        '/api/site/reset-password',
        {
          password: newPassword,
        },
        { headers: { Authorization: `Bearer ${code}` } },
      );
      // 비밀번호 초기화를 성공했다면 성공 토스트를 띄워줍니다.
      Toast.success(MESSAGE.passwordChangeSuccess);
      // 로그인 페이지로 이동시킵니다.
      navLogin();
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        setError('잘못된 토큰 정보입니다.');
      }
    }
  });

  return {
    register,
    submitHandler,
    isLengthValid,
    isHasAlphaNumericValid,
    isMatch,
    error,
  };
}
