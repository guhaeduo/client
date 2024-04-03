import React from 'react';
import { PostContent } from 'types/post';
import classNames from 'classnames/bind';
import { duoPostPasswordValidation } from 'utils/validator';
import Input from 'components/common/input/Input';
import usePostDeleteForm from 'hooks/form/usePostDeleteForm';
import styles from './postDeleteModal.module.scss';

const cn = classNames.bind(styles);

type Props = {
  postData: PostContent;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onQueryUpdateHandler: () => void;
};

/**
 * 듀오 게시글을 삭제할 수 있는 모달
 * @param { PostData } postData - 삭제하고자 하는 듀오 게시글의 데이터 입니다.
 * @param { React.Dispatch<React.SetStateAction<boolean>> } setIsOpen - 모달을 닫을 수 있는 핸들러 입니다.
 * @param { () => void } onQueryUpdateHandler - 게시글 삭제를 완료하고 나서 쿼리를 업데이트 하는 함수입니다.
 */

export default function PostDeleteModal({
  postData,
  setIsOpen,
  onQueryUpdateHandler,
}: Props) {
  const { register, errors, onSubmitHandler } = usePostDeleteForm({
    postData,
    setIsOpen,
    onQueryUpdateHandler,
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
