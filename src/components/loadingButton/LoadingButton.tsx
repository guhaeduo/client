import styles from './loadingButton.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
const cn = classNames.bind(styles);

type Props = {
  isFetching: boolean;
  name?: string;
  onClickHandler: () => void;
  className: string;
  children: React.ReactNode;
  clickLimitTime?: number;
  type?: 'button' | 'submit';
};

export default function LoadingButton({
  isFetching,
  name,
  clickLimitTime,
  onClickHandler,
  children,
  className,
  type = 'button',
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const handleButtonClick = () => {
    setIsLoading(true);
    onClickHandler();
    if (name && clickLimitTime) {
      const now = Date.now();
      localStorage.setItem(
        `${name}_lastClick`,
        JSON.stringify(now + clickLimitTime * 1000),
      );
      setRemainingTime(clickLimitTime);
    }
  };

  const getPreviousClickTime = () => {
    const lastClickStr = localStorage.getItem(`${name}_lastClick`);
    return lastClickStr ? parseInt(lastClickStr) : 0;
  };

  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false);
      if (name && clickLimitTime) {
        const lastClickTime = getPreviousClickTime();
        const remainingTimeInSeconds = Math.ceil(
          (lastClickTime - Date.now()) / 1000,
        );
        setRemainingTime(remainingTimeInSeconds);
        if (remainingTimeInSeconds > 0) {
          const interval = setInterval(() => {
            const remainingTimeInSeconds = Math.ceil(
              (lastClickTime - Date.now()) / 1000,
            );
            setRemainingTime(remainingTimeInSeconds);
            if (remainingTimeInSeconds <= 0) {
              clearInterval(interval);
              localStorage.removeItem(`${name}_lastClick`);
            }
          }, 1000);
          return () => clearInterval(interval);
        }
      }
    }
  }, [isFetching, name]);

  return (
    <div className={cn('loadingButtonWrapper', className)}>
      <button
        className={cn('loadingButton')}
        onClick={handleButtonClick}
        disabled={isLoading || remainingTime > 0}
        type={type}
      >
        {isLoading ? (
          <CgSpinner className={cn('loadingIndicator')} />
        ) : (
          children
        )}
      </button>
      {remainingTime > 0 && (
        <span className={cn('remainingTime')}>
          {remainingTime}초 뒤 갱신 가능
        </span>
      )}
    </div>
  );
}
