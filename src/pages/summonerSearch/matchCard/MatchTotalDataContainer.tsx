import classNames from 'classnames/bind';
import { MatchData } from 'types/summoner';
import Objectives from './Objectives';
import styles from './matchCard.module.scss';

const cn = classNames.bind(styles);
type Props = {
  matchData: MatchData;
};

export default function MatchTotalDataContainer({ matchData }: Props) {
  return (
    <div className={cn('matchTotalData')}>
      <Objectives objectives={matchData.blue.objectives} team="blue" />
      <div className={cn('totalData')}>
        <div className={cn('totalKill')}>
          <span>Total Kill</span>
          <div
            style={{ flex: matchData.blue.totalKills }}
            className={cn('blue')}
          >
            {matchData.blue.totalKills}
          </div>
          <div style={{ flex: matchData.red.totalKills }} className={cn('red')}>
            {matchData.red.totalKills}
          </div>
        </div>
        <div className={cn('totalGold')}>
          <span>Total Gold</span>
          <div
            style={{ flex: matchData.blue.totalGold }}
            className={cn('blue')}
          >
            {matchData.blue.totalGold}
          </div>
          <div style={{ flex: matchData.red.totalGold }} className={cn('red')}>
            {matchData.red.totalGold}
          </div>
        </div>
      </div>
      <Objectives objectives={matchData.red.objectives} team="red" />
    </div>
  );
}
