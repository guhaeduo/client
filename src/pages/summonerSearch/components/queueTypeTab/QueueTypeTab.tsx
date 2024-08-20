import React, { Key } from 'react';
import classNames from 'classnames/bind';
import styles from './queueTypeTab.module.scss';

const cn = classNames.bind(styles);

type TabMenus<T> = {
  value: T;
  display: string;
}[];

type Props<T> = {
  queueType: T;
  setQueueType: React.Dispatch<React.SetStateAction<T>>;
  tabMenus: TabMenus<T>;
};

export default function QueueTypeTab<T>({
  queueType,
  setQueueType,
  tabMenus,
}: Props<T>) {
  return (
    <div className={cn('queueTypeTab')}>
      {tabMenus.map((menu) => (
        <button
          key={menu.value as Key}
          className={cn('queueTypeTabButton', {
            active: queueType === menu.value,
          })}
          onClick={() => setQueueType(menu.value)}
        >
          {menu.display}
        </button>
      ))}
    </div>
  );
}
