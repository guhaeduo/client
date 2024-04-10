import React from 'react';
import classNames from 'classnames/bind';
import styles from './toggle.module.scss';

const cn = classNames.bind(styles);

type Props = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

/**
 * 체크 여부와 체크 변경 함수를 받아 토글 버튼을 렌더링 합니다.
 * @param {boolean} isChecked - 토글의 체크 여부입니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsChecked - 토글의 테크 여부를 제어하는 함수입니다.
 * @param {string} className - 토글의 클래스입니다. (선택 사항)
 * @return 토글 버튼
 */

export default function Toggle({ isChecked, setIsChecked, className }: Props) {
  // 토글 버튼을 클릭했을때 실행되는 함수입니다.
  const onToggleClickHandler = () =>
    setIsChecked((prevChecked) => !prevChecked);

  return (
    <div className={cn('toggleWrapper', className)}>
      <div
        className={cn('toggle', className, { checked: isChecked })}
        onClick={onToggleClickHandler}
      >
        <div></div>
      </div>
    </div>
  );
}
