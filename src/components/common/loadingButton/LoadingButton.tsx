import styles from './loadingButton.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

const cn = classNames.bind(styles);

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFetching: boolean;
  name?: string;
  onClickHandler: () => void;
  className?: string;
  children: React.ReactNode;
  clickLimitTime?: number;
}

/**
 * 미리 스타일을 지정해둔 로딩 버튼입니다.
 * @param {boolean} isFetching - 외부에서 데이터를 패칭중인지 여부입니다.
 * @param {string?} name - 챔피언 이름입니다.
 * @param {void} onClickHandler - 버튼을 클릭하였을 때 실행할 함수입니다.
 * @param {string?} className - 클래스네임 입니다.
 * @param {React.ReactNode} children - children입니다.
 * @param {number} clickLimitTime - 다시 클릭할 수 있기까지의 시간입니다.
 */

export default function LoadingButton({
  isFetching,
  name,
  clickLimitTime,
  onClickHandler,
  children,
  className,
  ...rest
}: Props) {
  // 로딩버튼의 로딩 여부를 관리하는 상태입니다.
  const [isLoading, setIsLoading] = useState(false);
  // 몇 초 후에 클릭이 가능한지 제한시간을 관리하는 상태입니다.
  const [remainingTime, setRemainingTime] = useState(0);

  // 버튼을 클릭하였을때 실행할 함수입니다.
  const handleButtonClick = () => {
    // 로딩을 true로 변경합니다.
    setIsLoading(true);
    // 외부에서 받은 핸들러를 실행합니다.
    onClickHandler();

    if (name && clickLimitTime) {
      // 현재 시간을 구하고, 로컬 스토리지에 계산된 만료시간을 삽입합니다.
      const now = Date.now();
      const expirationTime = now + clickLimitTime * 1000;
      localStorage.setItem(
        `${name}_expirationTime`,
        JSON.stringify(expirationTime),
      );
      setRemainingTime(clickLimitTime);
    }
  };

  useEffect(() => {
    // 남은시간이 0보다 크다면 인터벌을 등록하며, 0보다 작다면 인터벌을 해제합니다.
    const handleRemainingTime = () => {
      if (remainingTime > 0) {
        const interval = setInterval(() => {
          setRemainingTime((prevRemainingTime) =>
            Math.max(prevRemainingTime - 1, 0),
          );
        }, 1000);
        return () => clearInterval(interval);
      }
    };

    if (!isFetching) {
      // 패칭이 종료되면 로딩을 종료합니다.
      setIsLoading(false);
      if (name && clickLimitTime) {
        // 만료 시간을 꺼내와 저장합니다.
        const expirationTime = parseInt(
          localStorage.getItem(`${name}_expirationTime`) || '0',
        );
        // 제한시간을 ms에서 second로 변경하여 저장합니다.
        const remainingTimeInSeconds = Math.ceil(
          (expirationTime - Date.now()) / 1000,
        );
        // handleReMainingTime은 1초뒤에 동작하기에, 미리 한 번 set 합니다.
        setRemainingTime(Math.max(remainingTimeInSeconds, 0));
        // 인터벌 실행
        handleRemainingTime();
      }
    }
  }, [isFetching, name, clickLimitTime, remainingTime]);

  return (
    <div className={cn('loadingButtonWrapper', className)}>
      <button
        className={cn('loadingButton')}
        onClick={handleButtonClick}
        disabled={isLoading || remainingTime > 0}
        {...rest}
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
