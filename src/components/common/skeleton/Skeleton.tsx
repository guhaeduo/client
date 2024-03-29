import React from 'react';
import styles from './skeleton.module.scss';
import classNames from 'classnames/bind';

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
