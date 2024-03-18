import { useForm } from 'react-hook-form';
import instance from 'service/instance';
import isCustomAxiosError from 'service/customAxiosError';
import hasAlphaNumeric from 'utils/hasAlphaNumeric';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
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
      Toast.success(MESSAGE.PASSWORD_CHANGE_SUCCESS);
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        Toast.error(err.response.data.message);
      }
    }
  });

  return {
    register,
    submitHandler,
    watch,
    isLengthValid,
    isHasAlphaNumericValid,
    isMatch,
    isDiffrentValid,
  };
}
