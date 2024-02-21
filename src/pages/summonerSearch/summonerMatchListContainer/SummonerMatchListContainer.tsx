import styles from './summonerMatchListContainer.module.scss';
import classNames from 'classnames/bind';
import { MatchData, MatchDataQueueType } from 'types/summoner';
import QueueTypeTab from '../component/QueueTypeTab';
import LaneSelector from 'components/laneSelector/LaneSelector';
import useOptionSelector from 'hooks/useOptionSelector';
import MatchCard from './MatchCard';
import { Lane } from 'types/summoner';

const cn = classNames.bind(styles);

export const MATH_LIST_TAB_MENUS: {
  value: MatchDataQueueType;
  display: string;
}[] = [
  { value: 'ALL', display: '모든 큐' },
  { value: 'SOLO', display: '솔로랭크' },
  { value: 'FREE', display: '전체랭크' },
  { value: 'NORMAL', display: '일반' },
];

const MATCH_LIST_LANE: Lane[] = ['TOP', 'JUG', 'MID', 'ADC', 'SUP'];

type Props = {
  matchQueueType: MatchDataQueueType;
  setMatchQueueType: React.Dispatch<React.SetStateAction<MatchDataQueueType>>;
  summonerMatchData: MatchData[];
};

export default function SummonerMatchListContainer({
  matchQueueType,
  setMatchQueueType,
  summonerMatchData,
}: Props) {
  console.log(matchQueueType, summonerMatchData);
  const [matchListLaneOption, setMatchListLaneOption] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });
  const matchListLane = matchListLaneOption[0] as Lane;
  const matchListData =
    matchListLane === 'ALL'
      ? summonerMatchData
      : summonerMatchData.filter(
          (match) => match.currentSummonerMatchData.lane === matchListLane,
        );
  const matchListDataLane = summonerMatchData.map(
    (match) => match.currentSummonerMatchData.lane,
  );
  const disableLane = MATCH_LIST_LANE.filter(
    (menu) => !matchListDataLane.includes(menu),
  );

  console.log(disableLane);
  return (
    <div className={cn('matchListContainer')}>
      <div className={cn('matchList')}>
        <div className={cn('optionContainer')}>
          <QueueTypeTab
            queueType={matchQueueType}
            tabMenus={MATH_LIST_TAB_MENUS}
            setQueueType={setMatchQueueType}
          />
          <LaneSelector
            options={matchListLaneOption}
            onChange={setMatchListLaneOption}
            size={35}
            disableLane={disableLane}
          />
        </div>
        <ul className={cn('matchCardContainer')}>
          {matchListData.map((match) => (
            <MatchCard key={match.matchId} matchData={match} />
          ))}
        </ul>
      </div>
      <div className={cn('matchListSummary')}></div>
    </div>
  );
}
