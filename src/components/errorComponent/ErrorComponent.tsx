import { IoAlertCircleOutline } from 'react-icons/io5';
import styles from './errorComponent.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PATH from 'constants/path';
const cn = classNames.bind(styles);

type Props = {
  errorMessage: string;
  centered?: boolean;
};

/**
 * 미리 스타일을 지정해둔 에러 컴포넌트입니다.
 * @param {string} errorMessage - 화면에 표시할 에러메세지 입니다.
 * @param {boolean} centered? - 에러 메세지가 표시될 상위 컴포넌트가 센터 속성인지 여부를 받습니다.
 */

export default function ErrorComponent({ errorMessage, centered }: Props) {
  return (
    <div className={cn('errorContainer', { centered })}>
      <IoAlertCircleOutline className={cn('alertIcon')} />
      <p className={cn('errorMessage')}>{errorMessage}</p>
      <Link to={PATH.HOME} className={cn('toHomeBtn') + ' toHomeBtn'}>
        홈으로 이동
      </Link>
    </div>
  );
}
