import { IoAlertCircleOutline } from 'react-icons/io5';
import useCustomNavigation from 'hooks/useCustomNavigation';
import styles from './errorComponent.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  errorMessage: string;
  centered?: boolean;
};

export default function ErrorComponent({ errorMessage, centered }: Props) {
  const { navHome } = useCustomNavigation();
  return (
    <div className={cn('errorContainer', { centered })}>
      <IoAlertCircleOutline className={cn('alertIcon')} />
      <p className={cn('errorMessage')}>{errorMessage}</p>
      <button onClick={navHome} className={cn('toHomeBtn') + ' toHomeBtn'}>
        홈으로 이동
      </button>
    </div>
  );
}
