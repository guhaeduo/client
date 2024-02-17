import { useState, useEffect } from 'react';
import { SummonerInfo, SummonerRankSummary } from 'types/summoner';
import getSummonerRankSummary from 'service/getSummonerSummary';
import styles from './SummonerRankSummary.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  summonerInfo: SummonerInfo;
};

type QueueType = 'SOLO' | 'FREE';

export default function SummonerRankSummary({ summonerInfo }: Props) {
  const [queueType, setQueueType] = useState<QueueType>('SOLO');
  const [summonerRankSummary, setSummonerRankSummary] =
    useState<SummonerRankSummary>();

  const updateSummonerRankSummary = async () => {
    try {
      const summonerRankSummary = await getSummonerRankSummary(
        summonerInfo.puuid,
        queueType,
      );
      setSummonerRankSummary(summonerRankSummary);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateSummonerRankSummary();
  }, [queueType]);
  console.log(summonerRankSummary);

  return (
    <div className={cn('rankSummaryContainer')}>
      <div className={cn('queueTypeTab')}>
        <button
          className={cn('queueTypeTabButton', { active: queueType === 'SOLO' })}
          onClick={() => setQueueType('SOLO')}
        >
          솔로랭크
        </button>
        <button
          className={cn('queueTypeTabButton', { active: queueType === 'FREE' })}
          onClick={() => setQueueType('FREE')}
        >
          자유랭크
        </button>
      </div>
    </div>
  );
}
