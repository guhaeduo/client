import { useForm } from 'react-hook-form';
import instance from 'service/instance';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
import isCustomAxiosError from 'service/isCustomAxiosError';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import { PostContent } from 'types/post';

type Props = {
  postData: PostContent;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onQueryClearHandler: () => void;
};

type FormValue = {
  password: string;
};

/**
 * 듀오 게시글을 삭제할 수 있는 모달
 * @param { PostData } postData - 삭제하고자 하는 듀오 게시글의 데이터 입니다.
 * @param { React.Dispatch<React.SetStateAction<boolean>> } setIsOpen - 모달을 닫을 수 있는 핸들러 입니다.
 * @param { () => void } onQueryClearHandler - 게시글 삭제를 완료하고 나서 쿼리를 업데이트 하는 함수입니다.
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

  // 듀오 게시글 삭제 요청 함수입니다.
  const onSubmitHandler = handleSubmit(async (data) => {
    try {
      await instance.delete(`/api/duo/post/${postData.postId}`, {
        data: {
          memberId: 1,
          isGuestPost: postData.isGuestPost,
          passwordCheck: data.password,
        },
      });
      // 듀오 게시글 삭제 성공시 모달을 닫고 성공 응답과 함께 캐싱된 쿼리를 초기화 합니다.
      setIsOpen(false);
      Toast.success(MESSAGE.duoPostDeleteSuccess);
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
    onSubmitHandler,
  };
}
