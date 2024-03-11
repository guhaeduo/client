import React from 'react';
import styles from './toggle.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  label: string;
};
export default function Toggle({
  isChecked,
  setIsChecked,
  className,
  label,
}: Props) {
  const onToggleClickHandler = () =>
    setIsChecked((prevChecked) => !prevChecked);
  return (
    <div className={cn('toggleWrapper', className)}>
      <label>{label}</label>
      <div
        className={cn('toggle', className, { checked: isChecked })}
        onClick={onToggleClickHandler}
      >
        <div></div>
      </div>
    </div>
  );
}
