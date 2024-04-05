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
 * 비밀번호 변경 모달입니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsModalOpen - 비밀번호 변경 모달을 열고 닫는 핸들러
 */

export default function usePasswordChangeForm({ setIsModalOpen }: Props) {
  const { register, handleSubmit, watch } = useForm<FormValue>({
    mode: 'onChange',
  });
  // 현재 Form의 데이터를 실시간으로 감지합니다.
  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');
  const newPasswordCheck = watch('newPasswordCheck');

  // 비밀번호 길이 유효성 검사
  const isLengthValid = currentPassword?.length > 7 && newPassword?.length > 7;

  // 비밀번호 숫자를 포함하고 있는지 유효성 검사
  const isHasAlphaNumericValid = hasAlphaNumeric(newPassword);

  // 새로운 비밀번호와 비밀번호 재입력이 일치하는지 유효성 검사
  const isMatch = newPassword && newPassword === newPasswordCheck;

  // 현재 비밀번호와 새로운 비밀번호가 다른지 유효성 검사
  const isDiffrentValid = currentPassword !== newPassword;

  // 모든 유효성 검사가 통과했는지 관리하는 변수
  const isValid =
    isLengthValid && isHasAlphaNumericValid && isMatch && isDiffrentValid;

  // 비밀번호 변경 요청을 보내는 함수
  const submitHandler = handleSubmit(async () => {
    // 만약 하나라도 유효성 검사 통과하지 못했을 시 함수 종료
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
      Toast.success(MESSAGE.PASSWORD_CHANGE_SUCCESS);
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
    watch,
    isLengthValid,
    isHasAlphaNumericValid,
    isMatch,
    isDiffrentValid,
    isValid,
  };
}
