import { useForm } from 'react-hook-form';
import instance from 'service/instance';
import isCustomAxiosError from 'service/isCustomAxiosError';
import fetchUser from 'service/fetchUser';

interface FormValue {
  email: string;
  password: string;
}

/**
 * 로그인 폼입니다.
 * @return {UseFormRegister<FormValue>} register - 입력 필드 등록 함수
 * @return {(e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>} submitHandler - 폼 제출 핸들러
 * @return {FieldErrors<FormValue>} errors - 폼 필드의 유효성 검사 오류
 * @return {UseFormGetValues<FormValue>} getValues - 폼 필드의 현재 값 가져오기 함수
 * @return {boolean} isValid - 폼의 유효성 검사 통과 여부
 */

export default function useLoginForm() {
  // 로그인을 위한 폼을 생성합니다.
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    setValue,
  } = useForm<FormValue>({ mode: 'onChange' });

  /** 로그인 요청 함수 */
  const submitHandler = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      // 서버로 이메일과 패스워드와 함께 로그인 요청
      await instance.post('/api/site/login', {
        email,
        password,
      });
      // 로그인에 성공했다면 유저의 정보를 받아오는 함수를 실행합니다.
      await fetchUser();
    } catch (err) {
      if (isCustomAxiosError(err)) {
        // 로그인에 실패했다면 실패 이유를 에러 객체에 담아주고 비밀번호를 초기화 시킵니다.
        setError('email', {
          type: 'pattern',
          message: err.response?.data.message,
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
