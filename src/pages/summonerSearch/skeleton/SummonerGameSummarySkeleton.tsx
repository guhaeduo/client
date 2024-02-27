import React from 'react';
import styles from '../summonerGameSummary/summonerGameSummaryContainer.module.scss';
import classNames from 'classnames/bind';
import { SummaryQueueType } from 'types/summoner';
import QueueTypeTab from '../component/QueueTypeTab';
import Skeleton from 'components/skeleton/Skeleton';
import { SUMMARY_TAB_MENUS } from '../summonerGameSummary/SummonerGameSummaryContainer';
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
    <div className={cn('summaryContainer', 'skeleton')}>
      <QueueTypeTab
        tabMenus={SUMMARY_TAB_MENUS}
        queueType={summaryQueueType}
        setQueueType={setSummaryQueueType}
      />
      <div className={cn('summary')}>
        <div className={cn('informationContainer')}>
          <h5>정보</h5>
          <div className={cn('infomations')}>
            <div className={cn('winningRateChartContainer')}>
              <Skeleton className={cn('infomationWinningRate')} />
            </div>
            <div className={cn('infoDivider')}></div>
            <div className={cn('infoDataContainer')}>
              <Skeleton className={cn('infoKDA')} />
              <Skeleton className={cn('infoKDS')} />
              <div className={cn('infoLane')}>
                <div>
                  <Skeleton className={cn('infoLaneOption')} />
                  <Skeleton className={cn('infoLaneDescription')} />
                </div>
                <div>
                  <Skeleton className={cn('infoLaneOption')} />
                  <Skeleton className={cn('infoLaneDescription')} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('detailsContainer')}>
          <h5>라인별 상세정보 / 모스트 챔피언</h5>
          <div className={cn('details')}>
            <Skeleton className={cn('laneSelector')} />
            <div className={cn('detailsTop')}>
              <div className={cn('mostChampions')}>
                <Skeleton className={cn('championTag')} />
                <Skeleton className={cn('championTag')} />
                <Skeleton className={cn('championTag')} />
              </div>
              <div className={cn('detailGameCntChartContainer')}>
                <Skeleton className={cn('detailGameCnt')} />
              </div>
            </div>
            <div className={cn('detailData')}>
              <Skeleton className={cn('detailDataItem')} />
              <Skeleton className={cn('detailDataItem')} />
              <Skeleton className={cn('detailDataItem')} />
              <Skeleton className={cn('detailDataItem')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
