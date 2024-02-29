import { useForm } from 'react-hook-form';

interface FormValue {
  email: string;
  password: string;
}

export default function useLoginForm() {
  const {
    register,
    handleSubmit, // handleSubmit 함수 추가
    formState: { errors },
    getValues,
  } = useForm<FormValue>();

  const submitHandler = handleSubmit((data) => {
    const { email, password } = getValues();
    console.log({ email, password, data }, 'hello');
  });

  return {
    register,
    submitHandler,
    errors,
    getValues,
  };
}
