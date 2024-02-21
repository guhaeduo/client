import { MatchData } from 'types/summoner';
import styles from './summonerMatchListContainer.module.scss';
import classNames from 'classnames/bind';
import calculateGameDuration from 'utils/calculateGameDuration';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import ItemIcon from 'components/itemIcon/ItemIcon';
const cn = classNames.bind(styles);

type Props = {
  matchData: MatchData;
};

export default function MatchCard({ matchData }: Props) {
  const { currentSummonerMatchData, info } = matchData;
  console.log(matchData);
  console.log(currentSummonerMatchData.itemNumberList);
  return (
    <li className={cn('matchCard')}>
      <div className={cn('currentSummonerMatchCard')}>
        <div className={cn('content')}>
          <div className={cn('matchInfo')}>
            <span className={cn('queueType')}>{info.queueType}</span>
            <span className={cn('timeStamp')}>1시간 전</span>
            <span className={cn('result')}>승리</span>
            <span className={cn('duration')}>
              {calculateGameDuration(info.gameDuration)}
            </span>
          </div>
          <div className={cn('data')}>
            <div className={cn('currentSummonerData')}>
              <div>
                <ChampionIcon
                  className={cn('championIcon')}
                  championName={currentSummonerMatchData.championName}
                />
                <div className={cn('grade')}>
                  <span>{currentSummonerMatchData.kill} /</span>
                  <span> {currentSummonerMatchData.death} </span>
                  <span>/ {currentSummonerMatchData.assists}</span>
                </div>
              </div>
              <div className={cn('itemList')}>
                {currentSummonerMatchData.itemNumberList.map((itemNumber) => (
                  <ItemIcon
                    className={cn('itemIcon')}
                    itemNumber={itemNumber}
                    key={Math.random()}
                  />
                ))}
              </div>
            </div>
            <div className={cn('gradeSummary')}>
              <span>분당 CS</span>
              <span>킬 관여율</span>
            </div>
          </div>
          <div className={cn('participants')}>
            <ul></ul>
            <ul></ul>
          </div>
        </div>
        <div className={cn('SetOpenButton')}></div>
      </div>
      <div></div>
    </li>
  );
}
