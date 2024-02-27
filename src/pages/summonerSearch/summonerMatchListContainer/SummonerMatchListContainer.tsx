import styles from './summonerMatchListContainer.module.scss';
import classNames from 'classnames/bind';
import { MatchData, MatchDataQueueType } from 'types/summoner';
import QueueTypeTab from '../component/QueueTypeTab';
import LaneSelector from 'components/laneSelector/LaneSelector';
import useOptionSelector from 'hooks/useOptionSelector';
import MatchCard from './matchCard/MatchCard';
import { Lane } from 'types/summoner';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import calculateGrade from 'utils/calculateGrade';
import { useNavigate } from 'react-router-dom';
const cn = classNames.bind(styles);

export const MATH_LIST_TAB_MENUS: {
  value: MatchDataQueueType;
  display: string;
}[] = [
  { value: 'ALL', display: '모든 큐' },
  { value: 'SOLO', display: '솔로랭크' },
  { value: 'FREE', display: '자유랭크' },
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
  const [matchListLaneOption, setMatchListLaneOption] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });
  const navigate = useNavigate();
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
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setMatchListLaneOption('ALL');
  }, [pathname, matchQueueType]);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

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
            size={30}
            disableLane={disableLane}
          />
        </div>
        <ul className={cn('matchCardContainer')}>
          {matchListData.length > 0 ? (
            matchListData.map((match) => (
              <MatchCard key={match.matchId} matchData={match} />
            ))
          ) : (
            <div className={cn('matchDataNotFound')}>
              데이터가 존재하지 않습니다.
            </div>
          )}
        </ul>
      </div>
      <div className={cn('matchListSummary')}>
        {matchListData.map((match) => {
          const grade = calculateGrade(
            match.currentSummonerMatchData.kill,
            match.currentSummonerMatchData.death,
            match.currentSummonerMatchData.assists,
          );
          const numGrade = Number(grade);
          const gradeColor =
            numGrade > 7 ? '#ff5353' : numGrade > 5 ? '#7e7efa' : 'grey';
          return (
            <div
              className={cn('matchListSummaryItem', {
                win: match.currentSummonerMatchData.win,
                lose: !match.currentSummonerMatchData.win,
                quickShutdown: match.info.quickShutdown,
              })}
              key={match.matchId}
              onClick={() => navigate(`${pathname}#${match.matchId}`)}
            >
              <ChampionIcon
                className={cn('championIcon')}
                championName={match.currentSummonerMatchData.championName}
              />
              <span style={{ color: gradeColor }}>{grade}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
