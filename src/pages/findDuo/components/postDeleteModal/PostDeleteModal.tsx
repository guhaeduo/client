import React from 'react';
import { PostContent } from 'types/post';
import styles from './postDeleteModal.module.scss';
import classNames from 'classnames/bind';
import { duoPostPasswordValidation } from 'utils/validator';
import { useForm } from 'react-hook-form';
import Input from 'components/input/Input';
import instance from 'service/instance';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
import isCustomAxiosError from 'service/customAxiosError';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';

const cn = classNames.bind(styles);

type Props = {
  postData: PostContent;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onQueryUpdateHandler: () => void;
};

type FormValue = {
  password: string;
};

export default function PostDeleteModal({
  postData,
  setIsOpen,
  onQueryUpdateHandler,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmitHandler = handleSubmit(async (data) => {
    try {
      await instance.delete(`/api/duo/post/${postData.postId}`, {
        data: {
          memberId: 1,
          isGuestPost: postData.isGuestPost,
          passwordCheck: data.password,
        },
      });
      setIsOpen(false);
      Toast.success(MESSAGE.DUO_POST_DELETE_SUCCESS);
      onQueryUpdateHandler();
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        Toast.error(err.response.data.message);
        return;
      }
      Toast.error(UNKNOWN_NET_ERROR_MESSAGE);
    }
  });

  return (
    <form onSubmit={onSubmitHandler} className={cn('postDeleteModal')}>
      {postData.isGuestPost && (
        <div>
          <Input
            label="비밀번호"
            type="text"
            className={cn('passwordInput')}
            {...register('password', duoPostPasswordValidation)}
            error={errors.password}
          />
        </div>
      )}
      <p className={cn('warnning')}>
        게시글은 삭제 이후 되돌릴 수 없습니다. <br /> 정말 삭제하시겠습니까?
      </p>
      <div className={cn('buttons')}>
        <button
          type="button"
          className={cn('cancelBtn')}
          onClick={() => setIsOpen(false)}
        >
          취소
        </button>
        <button type="submit" className={cn('redBtn')}>
          삭제
        </button>
      </div>
    </form>
  );
}
