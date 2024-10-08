import { IoAlertCircleOutline } from 'react-icons/io5';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PATH from 'constants/path';
import styles from './errorComponent.module.scss';

const cn = classNames.bind(styles);

type Props = {
  errorMessage: string;
  centered?: boolean;
};

/**
 * 에러 메세지를 입력 받아 에러 컴포넌트를 렌더링 합니다.
 * @param {string} errorMessage - 화면에 표시할 에러메세지 입니다.
 * @param {boolean} centered - 에러 메세지가 표시될 상위 컴포넌트가 센터 속성인지 여부를 받습니다. (선택 사항)
 * @return 에러를 표시하는 요소
 */

export default function ErrorComponent({ errorMessage, centered }: Props) {
  return (
    <div className={cn('errorContainer', { centered })}>
      <IoAlertCircleOutline className={cn('alertIcon')} />
      <p className={cn('errorMessage')}>{errorMessage}</p>
      <Link to={PATH.home} className={`${cn('toHomeBtn')} toHomeBtn`}>
        홈으로 이동
      </Link>
    </div>
  );
}
