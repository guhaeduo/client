import React from 'react';
import styles from '../summonerGameSummary/summonerGameSummaryContainer.module.scss';
import classNames from 'classnames/bind';
import { SummaryQueueType } from 'types/summoner';
import RankSummaryQueueTypeTab from '../summonerGameSummary/GameSummaryQueueTypeTab';
const cn = classNames.bind(styles);

type Props = {
  summaryQueueType: SummaryQueueType;
  setSummaryQueueType: React.Dispatch<React.SetStateAction<SummaryQueueType>>;
};

export default function SummonerGameSummarySkeleton({
  summaryQueueType,
  setSummaryQueueType,
}: Props) {
  return (
    <div className={cn('rankSummaryContainer')}>
      <RankSummaryQueueTypeTab
        summaryQueueType={summaryQueueType}
        setSummaryQueueType={setSummaryQueueType}
      />
      RankSummary 로딩
    </div>
  );
}
