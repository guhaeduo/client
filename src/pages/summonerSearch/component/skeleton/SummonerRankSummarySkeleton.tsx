import React from 'react';
import styles from '../summonerRankSummary/SummonerRankSummaryContainer.module.scss';
import classNames from 'classnames/bind';
import { SummaryQueueType } from 'types/summoner';
import RankSummaryQueueTypeTab from '../summonerRankSummary/RankSummaryQueueTypeTab';
const cn = classNames.bind(styles);

type Props = {
  summaryQueueType: SummaryQueueType;
  setSummaryQueueType: React.Dispatch<React.SetStateAction<SummaryQueueType>>;
};

export default function SummonerRankSummarySkeleton({
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
