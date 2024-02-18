import { SummonerGameSummary } from 'types/summoner';
import styles from './SummonerRankSummaryContainer.module.scss';
import classNames from 'classnames/bind';
import { SummaryQueueType } from 'types/summoner';
import RankSummaryQueueTypeTab from './RankSummaryQueueTypeTab';

const cn = classNames.bind(styles);

type Props = {
  summonerRankSummary: SummonerGameSummary;
  isSummonerRankSummaryLoading: boolean;
  summaryQueueType: SummaryQueueType;
  setSummaryQueueType: React.Dispatch<React.SetStateAction<SummaryQueueType>>;
};

export default function SummonerRankSummaryContainer({
  summonerRankSummary,
  isSummonerRankSummaryLoading,
  summaryQueueType,
  setSummaryQueueType,
}: Props) {
  return (
    <div className={cn('rankSummaryContainer')}>
      <RankSummaryQueueTypeTab
        summaryQueueType={summaryQueueType}
        setSummaryQueueType={setSummaryQueueType}
      />
    </div>
  );
}
