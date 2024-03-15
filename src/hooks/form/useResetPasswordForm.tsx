import { useForm } from 'react-hook-form';
import useSearchParams from 'hooks/useSearchParams';
import hasAlphaNumeric from 'utils/hasAlphaNumeric';
import instance from 'service/instance';
import useCustomNavigation from 'hooks/useCustomNavigation';
import isCustomAxiosError from 'service/customAxiosError';
import { useEffect, useState } from 'react';
interface FormValue {
  newPassword: string;
  newPasswordCheck: string;
}

export default function useResetPasswordForm() {
  const { register, handleSubmit, watch } = useForm<FormValue>({
    mode: 'onChange',
  });
  const [error, setError] = useState('');

  const getParams = useSearchParams();
  const code = getParams('code');
  const newPassword = watch('newPassword');
  const newPasswordCheck = watch('newPasswordCheck');
  const isLengthValid = newPassword?.length > 7;
  const isHasAlphaNumericValid = hasAlphaNumeric(newPassword);
  const isMatch = newPassword && newPassword === newPasswordCheck;
  const { navLogin } = useCustomNavigation();

  useEffect(() => {
    if (!code || !code?.trim()) setError('잘못된 접근입니다.');
  }, []);

  const submitHandler = handleSubmit(async (data) => {
    if (!(isLengthValid && isHasAlphaNumericValid && isMatch)) return;
    const { newPassword } = data;
    try {
      await instance.patch(
        '/api/site/reset-password',
        {
          password: newPassword,
        },
        { headers: { Authorization: `Bearer ${code}` } },
      );
      navLogin();
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        console.log(err);
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
