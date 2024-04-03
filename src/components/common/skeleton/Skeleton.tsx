import classNames from 'classnames/bind';
import styles from './skeleton.module.scss';

const cn = classNames.bind(styles);

type Props = {
  className: string;
};

/**
 * 스켈레톤 입니다.
 * @param {string} className - 스켈레톤 클래스입니다.
 */

export default function Skeleton({ className }: Props) {
  return <div className={cn(className, 'skeleton')}></div>;
}
