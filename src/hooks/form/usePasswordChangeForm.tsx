import { useForm } from 'react-hook-form';
import instance from 'service/instance';
import isCustomAxiosError from 'service/isCustomAxiosError';
import hasAlphaNumeric from 'utils/hasAlphaNumeric';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';

interface FormValue {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * 비밀번호 변경 모달 폼입니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsModalOpen - 비밀번호 변경 모달을 열고 닫는 핸들러
 *
 * @return {UseFormRegister<FormValue>} register - 입력 필드 등록 함수
 * @return {(e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>} submitHandler - 폼 제출 핸들러
 * @return {boolean} isLengthValid - 비밀번호 길이 유효성 검사 통과 여부
 * @return {boolean} isHasAlphaNumericValid - 비밀번호 패턴 유효성 검사 통과 여부
 * @return {boolean} isMatch - 새로운 비밀번호와 비밀번호 재입력이 일치하는지 유효성 검사 통과 여부
 * @return {boolean} isDiffrentValid - 현재 비밀번호와 새로운 비밀번호가 다른지 유효성 검사 통과 여부
 * @return {boolean} isValid - 모든 유효성 검사 통과 여부
 */

export default function usePasswordChangeForm({ setIsModalOpen }: Props) {
  // 비밀번호 변경을 위한 폼을 생성합니다.
  const { register, handleSubmit, watch } = useForm<FormValue>({
    mode: 'onChange',
  });

  // 폼 데이터를 실시간으로 감지합니다.
  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');
  const newPasswordCheck = watch('newPasswordCheck');

  // 비밀번호 길이 유효성 검사 통과 여부
  const isLengthValid = currentPassword?.length > 7 && newPassword?.length > 7;

  // 비밀번호 패턴 유효성 검사 통과 여부
  const isHasAlphaNumericValid = hasAlphaNumeric(newPassword);

  // 새로운 비밀번호와 비밀번호 재입력이 일치하는지 유효성 검사 통과 여부
  const isMatch = newPassword && newPassword === newPasswordCheck;

  // 현재 비밀번호와 새로운 비밀번호가 다른지 유효성 검사 통과 여부
  const isDiffrentValid = currentPassword !== newPassword;

  // 모든 유효성 검사 통과 여부
  const isValid =
    isLengthValid && isHasAlphaNumericValid && isMatch && isDiffrentValid;

  /** 비밀번호 변경 요청 함수 */
  const submitHandler = handleSubmit(async () => {
    // 만약 유효성 검사를 하나라도 통과하지 못했을 시 즉시 함수 종료
    if (
      !(isLengthValid && isHasAlphaNumericValid && isMatch && isDiffrentValid)
    )
      return;

    try {
      // 비밀번호 변경 요청
      await instance.patch('/api/site/update-password', {
        beforePassword: currentPassword,
        afterPassword: newPassword,
      });

      // 비밀번호 변경 성공시 모달을 닫고 변경 완료 메세지 띄워주기
      setIsModalOpen(false);
      Toast.success(MESSAGE.passwordChangeSuccess);
    } catch (err) {
      // 비밀번호 변경 실패시 에러 토스트 처리
      if (isCustomAxiosError(err) && err.response) {
        Toast.error(err.response.data.message);
      }
      Toast.error(UNKNOWN_NET_ERROR_MESSAGE);
    }
  });

  return {
    register,
    submitHandler,
    isLengthValid,
    isHasAlphaNumericValid,
    isMatch,
    isDiffrentValid,
    isValid,
  };
}
