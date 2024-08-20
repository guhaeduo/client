import { useForm } from 'react-hook-form';
import instance from 'service/instance';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
import isCustomAxiosError from 'service/isCustomAxiosError';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import { PostContent } from 'types/post';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';

type Props = {
  postData: PostContent;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onQueryClearHandler: () => void;
};

type FormValue = {
  password: string;
};

/**
 * 듀오 게시글 삭제 폼입니다.
 * @param { PostData } postData - 삭제하고자 하는 듀오 게시글의 데이터 입니다.
 * @param { React.Dispatch<React.SetStateAction<boolean>> } setIsOpen - 모달을 닫을 수 있는 핸들러 입니다.
 * @param { () => void } onQueryClearHandler - 게시글 삭제를 완료하고 나서 쿼리를 업데이트 하는 함수입니다.
 *
 * @return {UseFormRegister<FormValue>} register - 입력 필드 등록 함수
 * @return {FieldErrors<FormValue>} errors - 폼 필드의 유효성 검사 오류
 * @return {(e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>} submitHandler - 폼 제출 핸들러
 */

export default function usePostDeleteForm({
  postData,
  setIsOpen,
  onQueryClearHandler,
}: Props) {
  // 듀오 게시글 삭제 폼을 생성합니다.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  // 유저 객체를 가져옵니다.
  const user = useSelector(selectUser);

  // 듀오 게시글 삭제 요청 함수입니다.
  const submitHandler = handleSubmit(async (data) => {
    try {
      // 게시글 삭제 요청
      await instance.delete(`/api/duo/post/${postData.postId}`, {
        data: {
          memberId: user.memberId,
          isGuestPost: postData.isGuestPost,
          passwordCheck: data.password,
        },
      });
      // 게시글 삭제 성공시 모달을 닫습니다.
      setIsOpen(false);
      // 게시글 삭제 성공 메세지 토스트를 띄워줍니다.
      Toast.success(MESSAGE.duoPostDeleteSuccess);
      // 저장된 캐시를 삭제합니다.
      onQueryClearHandler();
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        Toast.error(err.response.data.message);
        return;
      }
      Toast.error(UNKNOWN_NET_ERROR_MESSAGE);
    }
  });

  return {
    register,
    errors,
    submitHandler,
  };
}
