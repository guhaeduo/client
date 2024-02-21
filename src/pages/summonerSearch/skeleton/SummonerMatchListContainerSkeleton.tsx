import { MatchDataQueueType } from 'types/summoner';
import styles from '../summonerMatchListContainer/summonerMatchListContainer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  matchQueueType: MatchDataQueueType;
  setMatchQueueType: React.Dispatch<React.SetStateAction<MatchDataQueueType>>;
};

export default function SummonerMatchListContainerSkeleton({
  matchQueueType,
  setMatchQueueType,
}: Props) {
  return <div>매치데이터 로딩</div>;
}
