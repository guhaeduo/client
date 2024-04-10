import ChampionIcon from 'components/common/championIcon/ChampionIcon';
import { calculateGrade } from 'utils/calculate';
import { MatchData } from 'types/summoner';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './matchPreviewCard.module.scss';

const cn = classNames.bind(styles);

type Props = {
  matchData: MatchData;
  pathname: string;
};

export default function MatchPreviewCard({ matchData, pathname }: Props) {
  const grade = calculateGrade(
    matchData.currentSummonerMatchData.kill,
    matchData.currentSummonerMatchData.death,
    matchData.currentSummonerMatchData.assists,
  );
  const navigate = useNavigate();
  let gradeColor = 'grey';
  if (grade > 7) {
    gradeColor = '#ff5353';
  } else if (grade > 5) {
    gradeColor = '#7e7efa';
  }
  return (
    <div
      className={cn('matchListSummaryItem', {
        win: matchData.currentSummonerMatchData.win,
        lose: !matchData.currentSummonerMatchData.win,
        quickShutdown: matchData.info.quickShutdown,
      })}
      key={matchData.matchId}
      onClick={() => navigate(`${pathname}#${matchData.matchId}`)}
    >
      <ChampionIcon
        className={cn('championIcon')}
        championName={matchData.currentSummonerMatchData.championName}
      />
      <span style={{ color: gradeColor }}>{grade}</span>
    </div>
  );
}
