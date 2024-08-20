import classNames from 'classnames/bind';
import styles from './skeleton.module.scss';

const cn = classNames.bind(styles);

type Props = {
  className: string;
};

/**
 * 스켈레톤 요소를 렌더링 합니다.
 * @param {string} className - 스켈레톤 클래스입니다.
 * @return 스켈레톤
 */

export default function Skeleton({ className }: Props) {
  return <div className={cn(className, 'skeleton')} />;
}
