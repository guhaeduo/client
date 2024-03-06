import styles from './input.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
const cn = classNames.bind(styles);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label: string;
  name: string;
  className?: string;
  type: string;
}

/**
 * 미리 스타일을 지정해둔 챔피언 아이콘입니다.
 * @param {FieldError?} error - 인풋의 에러 값을 받습니다.
 * @param {string} label - 인풋의 라벨 입니다.
 * @param {string} name - 인풋의 이름 입니다.
 * @param {string?} className - 클래스네임 입니다.
 * @param {string} type - 인풋 타입입니다.
 */

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { className, name, label, error, type, ...rest },
  ref,
) => {
  // 패스워드 인풋의 패스워드를 보여주는것을 관리하는 상태입니다.
  const [visiblePassword, setVisiblePassword] = useState(false);
  // 인풋의 타입이 패스워드인지 저장하는 값입니다.
  const isPassword = type === 'password';
  // 패스워드를 보여주는것을 제어하는 함수입니다.
  const onClickVisiblePasswordBtnhandler = () =>
    setVisiblePassword((prev) => !prev);

  return (
    <div className={cn('inputWrapper', { error }, className)}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        ref={ref}
        {...rest}
        className={cn({ password: isPassword })}
        type={isPassword && visiblePassword ? 'text' : type}
      />
      {isPassword && (
        <span
          className={cn('visiblePasswordBtn')}
          onClick={onClickVisiblePasswordBtnhandler}
        >
          {visiblePassword ? '숨기기' : '보기'}
        </span>
      )}
      <span className={cn('errorMessage')}>{error?.message}</span>
    </div>
  );
};

export default forwardRef(Input);
