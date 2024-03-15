import { useForm } from 'react-hook-form';
import instance from 'service/instance';
import isCustomAxiosError from 'service/customAxiosError';
import hasAlphaNumeric from 'utils/hasAlphaNumeric';
import { useState } from 'react';

interface FormValue {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function usePasswordChangeForm({ setIsModalOpen }: Props) {
  const { register, handleSubmit, watch } = useForm<FormValue>({
    mode: 'onChange',
  });
  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');
  const newPasswordCheck = watch('newPasswordCheck');

  const isLengthValid = newPassword?.length > 7;
  const isHasAlphaNumericValid = hasAlphaNumeric(newPassword);
  const isMatch = newPassword && newPassword === newPasswordCheck;
  const isDiffrentValid =
    newPassword?.length > 7 &&
    currentPassword?.length > 7 &&
    currentPassword !== newPassword;

  const [error, setError] = useState('');
  const submitHandler = handleSubmit(async (data) => {
    if (
      !(isLengthValid && isHasAlphaNumericValid && isMatch && isDiffrentValid)
    )
      return;
    const { currentPassword, newPassword } = data;
    try {
      await instance.patch('/api/site/update-password', {
        beforePassword: currentPassword,
        afterPassword: newPassword,
      });
      setIsModalOpen(false);
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        setError(err.response.data.message);
      }
    }
  });

  return {
    register,
    submitHandler,
    watch,
    error,
    isLengthValid,
    isHasAlphaNumericValid,
    isMatch,
    isDiffrentValid,
  };
}
