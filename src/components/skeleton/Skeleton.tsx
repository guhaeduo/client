import React from 'react';
import styles from './skeleton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  className: string;
};

export default function Skeleton({ className }: Props) {
  return <div className={cn(className, 'skeleton')}></div>;
}
