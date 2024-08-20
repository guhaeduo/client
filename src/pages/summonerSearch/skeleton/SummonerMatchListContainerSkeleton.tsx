import { MatchDataQueueType } from 'types/summoner';
import classNames from 'classnames/bind';
import Skeleton from 'components/common/skeleton/Skeleton';
import styles from '../summonerMatchListContainer/summonerMatchListContainer.module.scss';
import { MATH_LIST_TAB_MENUS } from '../summonerMatchListContainer/SummonerMatchListContainer';
import QueueTypeTab from '../components/queueTypeTab/QueueTypeTab';

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
          {[...Array(20)].map((_, i) => (
            <Skeleton key={i} className={cn('matchCard')} />
          ))}
        </ul>
      </div>
      <Skeleton className={cn('matchPreviewContainer', 'skeleton')} />
    </div>
  );
}
