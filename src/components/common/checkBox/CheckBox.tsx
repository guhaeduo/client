import { FaCheck } from 'react-icons/fa';
import classNames from 'classnames/bind';
import { MouseEventHandler } from 'react';
import styles from './checkBox.module.scss';

const cn = classNames.bind(styles);

type Props = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

/**
 * 체크 여부와 체크 변경 함수를 받아 체크 박스를 렌더링 합니다.
 * @param {string} isChecked - 체크박스의 체크 여부를 결정하는 값 입니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsChecked - 체크박스를 클릭하였을 때 실행시킬 함수입니다.
 * @param {string} className - 체크박스의 클래스 입니다. (선택 사항)
 * @return 체크박스 요소
 */

export default function CheckBox({
  isChecked,
  setIsChecked,
  className,
}: Props) {
  // 체크박스를 클릭했을때 실행되는 함수입니다.
  const onClickHandler: MouseEventHandler = (e) => {
    // 이벤트 버블링을 제한합니다.
    e.stopPropagation();
    // 체크 여부를 변경합니다.
    setIsChecked((prevValue) => !prevValue);
  };
  return (
    <div
      onClick={onClickHandler}
      className={cn('checkBox', className, { isCheck: isChecked })}
    >
      {isChecked && <FaCheck />}
    </div>
  );
}
