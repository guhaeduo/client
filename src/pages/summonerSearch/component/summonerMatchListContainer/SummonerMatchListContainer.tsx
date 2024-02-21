import styles from './summonerMatchListContainer.module.scss';
import classNames from 'classnames/bind';
import { MatchData, MatchDataQueueType } from 'types/summoner';
const cn = classNames.bind(styles);

type Props = {
  matchQueueType: MatchDataQueueType;
  setMatchQueueType: React.Dispatch<React.SetStateAction<MatchDataQueueType>>;
  summonerMatchData: MatchData;
};

export default function SummonerMatchListContainer({
  matchQueueType,
  setMatchQueueType,
  summonerMatchData,
}: Props) {
  console.log(matchQueueType, summonerMatchData);
  return <div></div>;
}
