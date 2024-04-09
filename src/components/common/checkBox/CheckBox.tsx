import { FaCheck } from 'react-icons/fa';
import classNames from 'classnames/bind';
import { MouseEventHandler } from 'react';
import styles from './checkBox.module.scss';

const cn = classNames.bind(styles);

type Props = {
  isCheck: boolean;
  setIsCheck: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

/**
 * 미리 스타일을 지정해둔 체크박스입니다.
 * @param {string} value - 체크박스의 체크 여부를 결정하는 값 입니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setValue - 체크박스를 클릭하였을 때 실행시킬 함수입니다.
 * @param {string} className - 체크박스의 클래스 입니다. (선택 사항)
 */

export default function CheckBox({ isCheck, setIsCheck, className }: Props) {
  // 체크박스를 클릭했을때 실행되는 함수입니다.
  const onClickHandler: MouseEventHandler = (e) => {
    // 이벤트 버블링을 제한합니다.
    e.stopPropagation();
    // 체크 여부를 변경합니다.
    setIsCheck((prevValue) => !prevValue);
  };
  return (
    <div
      onClick={onClickHandler}
      className={cn('checkBox', className, { isCheck })}
    >
      {isCheck && <FaCheck />}
    </div>
  );
}
