import React from 'react';
import { SummaryQueueType } from 'types/summoner';
import styles from './summonerGameSummaryContainer.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

type Props = {
  summaryQueueType: SummaryQueueType;
  setSummaryQueueType: React.Dispatch<React.SetStateAction<SummaryQueueType>>;
};

type TabMenus = {
  value: SummaryQueueType;
  display: string;
};
const tabMenus: TabMenus[] = [
  { value: 'ALL', display: '모든 큐' },
  { value: 'SOLO', display: '솔로랭크' },
  { value: 'FREE', display: '자유랭크' },
];

export default function GameSummaryQueueTypeTab({
  summaryQueueType,
  setSummaryQueueType,
}: Props) {
  return (
    <div className={cn('queueTypeTab')}>
      {tabMenus.map((menu) => (
        <button
          key={menu.value}
          className={cn('queueTypeTabButton', {
            active: summaryQueueType === menu.value,
          })}
          onClick={() => setSummaryQueueType(menu.value)}
        >
          {menu.display}
        </button>
      ))}
    </div>
  );
}
