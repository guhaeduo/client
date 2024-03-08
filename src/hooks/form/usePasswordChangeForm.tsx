import { useForm } from 'react-hook-form';

interface FormValue {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

export default function usePasswordChangeForm() {
  const { register, handleSubmit, getValues, watch } = useForm<FormValue>({
    mode: 'onChange',
  });

  const submitHandler = handleSubmit((data) => {
    const { currentPassword, newPassword, newPasswordCheck } = getValues();
    console.log(currentPassword, newPassword, newPasswordCheck);
  });

  return {
    register,
    submitHandler,
    watch,
  };
}
