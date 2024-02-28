// import { MdOutlineRefresh } from 'react-icons/md';
// import styles from './loadingButton.module.scss';
// import classNames from 'classnames/bind';
// import { useEffect, useState } from 'react';

// const cn = classNames.bind(styles);

// type Props = {
//   isFetching: boolean;
//   name: string;
//   onClickHandler: () => void;
//   className: string;
//   children: React.ReactNode;
//   clickLimitTime: number; // 더 명확한 이름으로 변경
// };

// export default function LoadingButton({
//   isFetching,
//   name,
//   clickLimitTime,
//   onClickHandler,
//   children,
//   className,
// }: Props) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(0);

//   const handleButtonClick = () => {
//     setIsLoading(true);
//     onClickHandler();
//   };

//   const getPreviousClickTime = () => {
//     const lastClickStr = localStorage.getItem(`${name}_lastClick`);
//     console.log(name, lastClickStr);
//     return lastClickStr ? parseInt(lastClickStr) : 0;
//   };

//   useEffect(() => {
//     if (!isFetching) {
//       setIsLoading(false);
//       if (isLoading) {
//         const now = Date.now();
//         localStorage.setItem(
//           `${name}_lastClick`,
//           JSON.stringify(now + clickLimitTime),
//         );
//         const lastClickTime = getPreviousClickTime();
//         const remainingTimeInMilliseconds = lastClickTime - now;
//         const remainingTimeInSeconds = Math.ceil(
//           remainingTimeInMilliseconds / 1000,
//         );
//         setRemainingTime(remainingTimeInSeconds);
//       }
//     }
//     const now = Date.now();
//     const lastClickTime = getPreviousClickTime();
//     const remainingTimeInMilliseconds = lastClickTime - now;
//     const remainingTimeInSeconds = Math.ceil(
//       remainingTimeInMilliseconds / 1000,
//     );
//     if (remainingTimeInSeconds >= 0) {
//       setRemainingTime(remainingTimeInSeconds);
//     } else {
//       setRemainingTime(0);
//       localStorage.removeItem(`${name}_lastClick`);
//     }
//     const interval = setInterval(() => {
//       const now = Date.now();
//       const lastClickTime = getPreviousClickTime();
//       const remainingTimeInMilliseconds = lastClickTime - now;
//       const remainingTimeInSeconds = Math.ceil(
//         remainingTimeInMilliseconds / 1000,
//       );
//       if (remainingTimeInSeconds >= 0) {
//         setRemainingTime(remainingTimeInSeconds);
//       } else {
//         setRemainingTime(0);
//         clearInterval(interval);
//         localStorage.removeItem(`${name}_lastClick`);
//       }
//     }, 1000);

//     return () => {
//       console.log('청소함수');
//       clearInterval(interval);
//     };
//   }, [isFetching, name]);

//   return (
//     <button
//       className={cn('loadingButton', className)}
//       onClick={handleButtonClick}
//       disabled={isLoading || remainingTime > 0}
//     >
//       {remainingTime > 0 ? (
//         `${remainingTime}초 뒤 갱신가능`
//       ) : isLoading ? (
//         <MdOutlineRefresh className={cn('loadingIndicator')} />
//       ) : (
//         children
//       )}
//     </button>
//   );
// }

import { MdOutlineRefresh } from 'react-icons/md';
import styles from './loadingButton.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cn = classNames.bind(styles);

type Props = {
  isFetching: boolean;
  name: string;
  onClickHandler: () => void;
  className: string;
  children: React.ReactNode;
  clickLimitTime: number; // 더 명확한 이름으로 변경
};

export default function LoadingButton({
  isFetching,
  name,
  clickLimitTime,
  onClickHandler,
  children,
  className,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const handleButtonClick = () => {
    setIsLoading(true);
    onClickHandler();
    const now = Date.now();
    localStorage.setItem(
      `${name}_lastClick`,
      JSON.stringify(now + clickLimitTime * 1000),
    );
    setRemainingTime(clickLimitTime);
  };

  const getPreviousClickTime = () => {
    const lastClickStr = localStorage.getItem(`${name}_lastClick`);
    return lastClickStr ? parseInt(lastClickStr) : 0;
  };

  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false);
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
  }, [isFetching, name]);

  return (
    <div className={cn('loadingButtonWrapper', className)}>
      <button
        className={cn('loadingButton')}
        onClick={handleButtonClick}
        disabled={isLoading || remainingTime > 0}
      >
        {isLoading ? (
          <MdOutlineRefresh className={cn('loadingIndicator')} />
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
