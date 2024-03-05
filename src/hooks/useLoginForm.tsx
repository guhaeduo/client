import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from 'store/userSlice';
import useCustomNavigation from './useCustomNavigation';
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
  } = useForm<FormValue>();
  const dispatch = useDispatch();
  const { navHome } = useCustomNavigation();
  const submitHandler = handleSubmit((data) => {
    const { email, password } = getValues();
    try {
      // 로그인 요청 코드
      dispatch(
        login({
          email: 'example@example.com',
          riotAccount: [{ country: 'KR', name: 'test', tag: '1234' }],
        }),
      );
      navHome();
    } catch (err) {
      console.log(err);
    }

    console.log({ email, password, data }, 'hello');
  });

  return {
    register,
    submitHandler,
    errors,
    getValues,
    isValid,
  };
}
