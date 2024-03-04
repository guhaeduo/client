import styles from './summonerSearchErrorContainer.module.scss';
import classNames from 'classnames/bind';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useCustomNavigation from 'hooks/useCustomNavigation';
const cn = classNames.bind(styles);

type Props = {
  errorMessage: string;
};

export default function SummonerSearchErrorContainer({ errorMessage }: Props) {
  const { navHome } = useCustomNavigation();
  return (
    <div className={cn('errorContainer')}>
      <IoAlertCircleOutline className={cn('alertIcon')} />
      <p className={cn('errorMessage')}>
        <span>{errorMessage}</span>
      </p>
      <button onClick={navHome} className={cn('toHomeBtn') + ' toHomeBtn'}>
        홈으로 이동
      </button>
    </div>
  );
}
