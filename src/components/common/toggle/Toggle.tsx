import React from 'react';
import styles from './toggle.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

/**
 * 미리 스타일을 지정해둔 토글버튼 입니다.
 * @param {boolean} isChecked - 토글의 체크 여부입니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsChecked - 토글의 테크 여부를 제어하는 함수입니다.
 * @param {string} className? - 토글의 클래스입니다.
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
