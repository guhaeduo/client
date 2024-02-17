import { useState } from 'react';
import styles from './summonerSearchPage.module.scss';
import classNames from 'classnames/bind';
import SummonerInfoContainer from './component/SummonerInfoContainer';
import SummonerSearchErrorContainer from './component/SummonerSearchErrorContainer';
import SummonerRankSummaryContainer from './component/SummonerRankSummaryContainer';
import useSummonerInfo from 'hooks/business/useSummonerInfo';
const cn = classNames.bind(styles);

export default function SummonerSearchPage() {
  const [error, setError] = useState<string>();
  const errorHandler = (err: string) => setError(err);
  const { summonerInfo, isSummonerInfoLoading } = useSummonerInfo({
    errorHandler,
  });
  console.log(summonerInfo, isSummonerInfoLoading);
  if (error) {
    return <SummonerSearchErrorContainer errorMessage={error} />;
  }

  return (
    <main className={cn('main', 'container')}>
      {/* <button onClick={() => setIsFirstLoading((prev) => !prev)}>
        로딩 변경 버튼
      </button> */}
      {summonerInfo && (
        <>
          <SummonerInfoContainer summonerInfo={summonerInfo} />
          <SummonerRankSummaryContainer summonerInfo={summonerInfo} />
        </>
      )}
    </main>
  );
}
