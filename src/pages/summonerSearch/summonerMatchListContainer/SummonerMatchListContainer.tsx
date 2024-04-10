import classNames from 'classnames/bind';
import { MatchData, MatchDataQueueType, Lane } from 'types/summoner';
import LaneSelector from 'components/common/laneSelector/LaneSelector';
import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MatchPreviewCard from '../components/matchPreviewCard/MatchPreviewCard';
import MatchCard from '../matchCard/MatchCard';
import QueueTypeTab from '../components/queueTypeTab/QueueTypeTab';
import styles from './summonerMatchListContainer.module.scss';

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
  const [matchListLaneOption, setMatchListLaneOption] =
    useSignularOptionSelector({
      defaultOption: 'ALL',
    });
  const matchListLane = matchListLaneOption as Lane;
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
            option={matchListLaneOption}
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
      <div className={cn('matchPreviewContainer')}>
        {matchListData.map((matchData) => (
          <MatchPreviewCard
            key={matchData.matchId}
            matchData={matchData}
            pathname={pathname}
          />
        ))}
      </div>
    </div>
  );
}
