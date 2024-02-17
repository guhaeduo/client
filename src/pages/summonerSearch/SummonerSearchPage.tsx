import { useState, useEffect } from 'react';
import styles from './summonerSearchPage.module.scss';
import classNames from 'classnames/bind';
import SummonerInfoContainer from './component/SummonerInfoContainer';
import SummonerSearchErrorContainer from './component/SummonerSearchErrorContainer';
import SummonerRankSummaryContainer from './component/SummonerRankSummaryContainer';
import useSummonerInfo from 'hooks/business/useSummonerInfo';
import useSummonerRankInfo from 'hooks/business/useSummonerRankInfo';
import useSummonerRankSummary from 'hooks/business/useSummonerSummary';
import { useParams } from 'react-router-dom';

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
    queueType,
    setQueueType,
  } = useSummonerRankSummary({ errorHandler, summonerInfo });

  console.log({ summonerInfo, summonerRankInfo, summonerRankSummary });

  useEffect(() => {
    setError('');
  }, [params]);

  if (error) {
    return <SummonerSearchErrorContainer errorMessage={error} />;
  }

  return (
    <main className={cn('main', 'container')}>
      {summonerInfo && summonerRankInfo && (
        <>
          <SummonerInfoContainer
            summonerInfo={summonerInfo}
            summonerRankInfo={summonerRankInfo}
          />
        </>
      )}
    </main>
  );
}
