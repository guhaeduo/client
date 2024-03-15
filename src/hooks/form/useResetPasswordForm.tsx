import { useForm } from 'react-hook-form';
import useSearchParams from 'hooks/useSearchParams';
import hasAlphaNumeric from 'utils/hasAlphaNumeric';

interface FormValue {
  newPassword: string;
  newPasswordCheck: string;
}

export default function useResetPasswordForm() {
  const { register, handleSubmit, getValues, watch } = useForm<FormValue>({
    mode: 'onChange',
  });

  const getParams = useSearchParams();
  const code = getParams('code');
  const newPassword = watch('newPassword');
  const newPasswordCheck = watch('newPasswordCheck');
  const isLengthValid = newPassword?.length > 7;
  const isHasAlphaNumericValid = hasAlphaNumeric(newPassword);
  const isMatch = newPassword && newPassword === newPasswordCheck;

  const submitHandler = handleSubmit((data) => {
    if (!(isLengthValid && isHasAlphaNumericValid && isMatch)) return;
    const { newPassword, newPasswordCheck } = getValues();
    console.log(newPassword, newPasswordCheck, code);
  });

  return {
    register,
    submitHandler,
    isLengthValid,
    isHasAlphaNumericValid,
    isMatch,
  };
}
