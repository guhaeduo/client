import { useForm } from 'react-hook-form';
import instance from 'service/instance';
import isCustomAxiosError from 'service/customAxiosError';
import { fetchUser } from 'service/fetchUser';
import { toast } from 'react-toastify';

interface FormValue {
  email: string;
  password: string;
}

export default function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    setValue,
  } = useForm<FormValue>({ mode: 'onChange' });

  const submitHandler = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      await instance.post('/api/site/login', {
        email,
        password,
      });
      await fetchUser();
      toast.success('환영합니다');
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        setError('email', {
          type: 'pattern',
          message: err.response.data.message,
        });
        setValue('password', '');
      }
    }
  });

  return {
    register,
    submitHandler,
    errors,
    getValues,
    isValid,
  };
}
