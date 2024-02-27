import { MdOutlineRefresh } from 'react-icons/md';
import styles from './loadingButton.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';

const cn = classNames.bind(styles);

type Props = {
  isFetching: boolean;
  name: string;
  onClickHandler: () => void;
  className: string;
  children: ReactNode;
  rimitTime: number;
};
export default function FetchButton({
  isFetching,
  name,
  rimitTime,
  onClickHandler,
  children,
  className,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    setIsLoading(true);
    onClickHandler();
    console.log('click');
  };

  useEffect(() => {
    if (!isFetching) setIsLoading(false);
  }, [isFetching]);

  return (
    <button
      className={cn('loadingButton', className, { disabled: isLoading })}
      onClick={onClick}
    >
      {isLoading ? (
        <MdOutlineRefresh className={cn('loadingIndicator')} />
      ) : (
        children
      )}
    </button>
  );
}
