import { MatchDataQueueType } from 'types/summoner';
import styles from '../summonerMatchListContainer/summonerMatchListContainer.module.scss';
import classNames from 'classnames/bind';
import { MATH_LIST_TAB_MENUS } from '../summonerMatchListContainer/SummonerMatchListContainer';
import QueueTypeTab from '../component/QueueTypeTab';
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
    <div className={cn('matchListContainer')}>
      <QueueTypeTab
        queueType={matchQueueType}
        tabMenus={MATH_LIST_TAB_MENUS}
        setQueueType={setMatchQueueType}
      />
      로딩
    </div>
  );
}
