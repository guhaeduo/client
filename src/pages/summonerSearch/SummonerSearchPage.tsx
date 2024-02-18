import { useState, useEffect } from 'react';
import styles from './summonerSearchPage.module.scss';
import classNames from 'classnames/bind';
import SummonerInfoContainer from './component/summonerInfoContainer/SummonerInfoContainer';
import SummonerSearchErrorContainer from './component/summonerSearchErrorContainer/SummonerSearchErrorContainer';
import SummonerRankSummaryContainer from './component/summonerRankSummary/SummonerRankSummaryContainer';
import useSummonerInfo from 'hooks/business/useSummonerInfo';
import useSummonerRankInfo from 'hooks/business/useSummonerRankInfo';
import useSummonerGameSummary from 'hooks/business/useSummonerGameSummary';
import { useParams } from 'react-router-dom';
import SummonerInfoContainerSkeleton from './component/skeleton/SummonerInfoContainerSkeleton';
import SummonerRankSummarySkeleton from './component/skeleton/SummonerRankSummarySkeleton';
const cn = classNames.bind(styles);

export default function SummonerSearchPage() {
  const params = useParams();
  const [error, setError] = useState<string>();
  const errorHandler = (err: string) => setError(err);
  const { summonerInfo, isSummonerInfoLoading } = useSummonerInfo({
    errorHandler,
  });
  const { summonerRankInfo, isSummonerRankInfoLoading } = useSummonerRankInfo({
    errorHandler,
    summonerInfo,
  });
  const {
    summonerRankSummary,
    isSummonerRankSummaryLoading,
    summaryQueueType,
    setSummaryQueueType,
  } = useSummonerGameSummary({ errorHandler, summonerInfo });

  useEffect(() => {
    setError('');
    return () => setSummaryQueueType('ALL');
  }, [params]);

  if (error) {
    return <SummonerSearchErrorContainer errorMessage={error} />;
  }

  return (
    <main className={cn('main', 'container')}>
      {summonerInfo && summonerRankInfo ? (
        <SummonerInfoContainer
          summonerInfo={summonerInfo}
          summonerRankInfo={summonerRankInfo}
        />
      ) : (
        <SummonerInfoContainerSkeleton />
      )}
      {summonerRankSummary ? (
        <SummonerRankSummaryContainer
          summonerRankSummary={summonerRankSummary}
          isSummonerRankSummaryLoading={isSummonerRankSummaryLoading}
          summaryQueueType={summaryQueueType}
          setSummaryQueueType={setSummaryQueueType}
        />
      ) : (
        <SummonerRankSummarySkeleton
          summaryQueueType={summaryQueueType}
          setSummaryQueueType={setSummaryQueueType}
        />
      )}
    </main>
  );
}
