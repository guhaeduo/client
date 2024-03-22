import React from 'react';
import { PostContent } from 'types/post';
import styles from './postDeleteModal.module.scss';
import classNames from 'classnames/bind';
import { duoPostPasswordValidation } from 'utils/validator';
import { useForm } from 'react-hook-form';
import Input from 'components/input/Input';
const cn = classNames.bind(styles);

type Props = {
  postData: PostContent;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValue = {
  password: string;
};

export default function PostDeleteModal({ postData, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmitHandler = handleSubmit((data) => {
    console.log(data);
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
