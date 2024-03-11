import { MatchDataQueueType } from 'types/summoner';
import styles from '../summonerMatchListContainer/summonerMatchListContainer.module.scss';
import classNames from 'classnames/bind';
import { MATH_LIST_TAB_MENUS } from '../summonerMatchListContainer/SummonerMatchListContainer';
import QueueTypeTab from '../components/QueueTypeTab';
import Skeleton from 'components/skeleton/Skeleton';
const cn = classNames.bind(styles);

type Props = {
  matchQueueType: MatchDataQueueType;
  setMatchQueueType: React.Dispatch<React.SetStateAction<MatchDataQueueType>>;
};

export default function SummonerMatchListContainerSkeleton({
  matchQueueType,
  setMatchQueueType,
}: Props) {
  return (
    <div className={cn('matchListContainer', 'skeleton')}>
      <div className={cn('matchList')}>
        <div className={cn('optionContainer')}>
          <QueueTypeTab
            queueType={matchQueueType}
            tabMenus={MATH_LIST_TAB_MENUS}
            setQueueType={setMatchQueueType}
          />
          <Skeleton className={cn('laneSelector')} />
        </div>
        <ul className={cn('matchCardContainer')}>
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
          <Skeleton className={cn('matchCard')} />
        </ul>
      </div>
      <Skeleton className={cn('matchListSummary')} />
    </div>
  );
}
