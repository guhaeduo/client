import { MatchData } from 'types/summoner';
import styles from './summonerMatchListContainer.module.scss';
import classNames from 'classnames/bind';
import calculateGameDuration from 'utils/calculateGameDuration';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import ItemIcon from 'components/itemIcon/ItemIcon';
import useCustomNavigation from 'hooks/useCustomNavigation';
import usePathSummonerData from 'hooks/usePathSummonerData';
import calculateGameEndStamp from 'utils/calculateGameEndStamp';
import ParticipantPreviewCard from './ParticipantPreviewCard';
import { IoIosArrowDown } from 'react-icons/io';
const cn = classNames.bind(styles);

type Props = {
  matchData: MatchData;
};
export default function MatchCard({ matchData }: Props) {
  const { currentSummonerMatchData, info, red, blue } = matchData;
  const { navSummonerSearch } = useCustomNavigation();
  const { country } = usePathSummonerData();
  const gameResult = info.quickShutdown
    ? '다시하기'
    : currentSummonerMatchData.win
      ? '승리'
      : '패배';

  return (
    <li
      className={cn('matchCard', {
        quickShutDown: info.quickShutdown,
        win: currentSummonerMatchData.win,
        lose: !currentSummonerMatchData.win,
      })}
    >
      <div className={cn('currentSummonerMatchCard')}>
        <div className={cn('content')}>
          <div className={cn('matchInfo')}>
            <span className={cn('queueType')}>{info.queueType}</span>
            <span className={cn('timeStamp')}>
              {calculateGameEndStamp(info.gameEndStamp)}
            </span>
            <span className={cn('result')}>{gameResult}</span>
            <span className={cn('duration')}>
              {calculateGameDuration(info.gameDuration)}
            </span>
          </div>
          <div className={cn('currentSummonerData')}>
            <div>
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
              <span>
                CS {currentSummonerMatchData.minionKill} (
                {currentSummonerMatchData.csPerMinute})
              </span>
              <span>킬 관여 {currentSummonerMatchData.killParticipation}</span>
            </div>
          </div>
        </div>
        <ul className={cn('participantsPreview')}>
          {red.participants.map((_, i) => (
            <li key={red.participants[i].puuid}>
              <ParticipantPreviewCard
                championName={blue.participants[i].championName}
                participant={blue.participants[i]}
                currentSummonerMatchData={currentSummonerMatchData}
                country={country}
              />
              <ParticipantPreviewCard
                championName={red.participants[i].championName}
                participant={red.participants[i]}
                currentSummonerMatchData={currentSummonerMatchData}
                country={country}
              />
            </li>
          ))}
        </ul>
        <div className={cn('setOpenButton')}>
          <IoIosArrowDown className={cn('setOpenIcon')} />
        </div>
      </div>
    </li>
  );
}
