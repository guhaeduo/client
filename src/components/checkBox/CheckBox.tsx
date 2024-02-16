import { FaCheck } from 'react-icons/fa6';
import styles from './checkBox.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

type Props = {
  value: boolean;
  onClick: () => void;
  className?: string;
};

/**
 * 미리 스타일을 지정해둔 체크박스입니다.
 * @param {string} value - 체크박스의 체크 여부를 결정하는 값 입니다.
 * @param {MouseEventHandler} onClick - 체크박스를 클릭하였을 때 실행시킬 함수입니다.
 * @param {string?} className - 체크박스의 클래스 입니다.
 */

export default function CheckBox({ value, onClick, className }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn('checkBox', className, { active: value })}
    >
      {value && <FaCheck />}
    </div>
  );
}
