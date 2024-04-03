import { useState, useMemo } from 'react';
import { MatchData } from 'types/summoner';
import classNames from 'classnames/bind';
import ChampionIcon from 'components/common/championIcon/ChampionIcon';
import ItemIcon from 'components/common/itemIcon/ItemIcon';
import usePathSummonerData from 'hooks/usePathSummonerData';
import {
  calculateTimeStamp,
  calculateGameDuration,
  calculateGrade,
} from 'utils/calculate';
import { IoIosArrowDown } from 'react-icons/io';
import SpellIcon from 'components/common/spellIcon/SpellIcon';
import PerksIcon from 'components/common/perksIcon/PerksIcon';
import ParticipantPreviewCard from './ParticipantPreviewCard';
import styles from './matchCard.module.scss';
import MatchDetailContainer from './MatchDetailContainer';

const cn = classNames.bind(styles);

type Props = {
  matchData: MatchData;
};

export default function MatchCard({ matchData }: Props) {
  const { currentSummonerMatchData, info, red, blue } = matchData;
  const { country } = usePathSummonerData();
  const [isOpen, setIsOpen] = useState(false);
  const cardOpenHandler = () => setIsOpen(!isOpen);

  let gameResult = '패배';

  if (info.quickShutdown) {
    gameResult = '다시하기';
  } else if (currentSummonerMatchData.win) {
    gameResult = '승리';
  }

  const formattedGameDuration = useMemo(
    () => calculateGameDuration(info.gameDuration),
    [info.gameDuration],
  );
  const formattedGameEndStamp = useMemo(
    () => calculateTimeStamp(info.gameEndStamp),
    [info.gameEndStamp],
  );
  return (
    <li
      className={cn('matchCard', {
        quickShutDown: info.quickShutdown,
        win: currentSummonerMatchData.win,
        lose: !currentSummonerMatchData.win,
      })}
    >
      <div id={matchData.matchId} className={cn('currentSummonerMatchCard')}>
        <div className={cn('content')}>
          <div className={cn('matchInfo')}>
            <span className={cn('queueType')}>{info.queueType}</span>
            <span className={cn('timeStamp')}>{formattedGameEndStamp}</span>
            <span className={cn('result')}>{gameResult}</span>
            <span className={cn('duration')}>{formattedGameDuration}</span>
          </div>
          <div className={cn('currentSummonerData')}>
            <div>
              <div>
                <ChampionIcon
                  className={cn('championIcon')}
                  championName={currentSummonerMatchData.championName}
                  championLevel={currentSummonerMatchData.championLevel}
                />
                <div className={cn('summonerSkills')}>
                  <SpellIcon
                    className={cn('spellIcon')}
                    spellNumber={currentSummonerMatchData.spell1Id}
                  />
                  <SpellIcon
                    className={cn('spellIcon')}
                    spellNumber={currentSummonerMatchData.spell2Id}
                  />
                  <PerksIcon
                    className={cn('perksIcon')}
                    perksStyle={
                      currentSummonerMatchData.perks.main.perkIdList[0]
                    }
                  />
                  <PerksIcon
                    className={cn('perksIcon')}
                    perksStyle={currentSummonerMatchData.perks.sub.perkStyle}
                  />
                </div>
                <div className={cn('kda')}>
                  <div className={cn('summonerKda')}>
                    <span>{currentSummonerMatchData.kill} </span>
                    <span>/</span>
                    <span>{currentSummonerMatchData.death}</span>
                    <span>/</span>
                    <span>{currentSummonerMatchData.assists}</span>
                  </div>
                  <div className={cn('grade')}>
                    {calculateGrade(
                      currentSummonerMatchData.kill,
                      currentSummonerMatchData.death,
                      currentSummonerMatchData.assists,
                    )}
                    :1 평점
                  </div>
                </div>
              </div>
              <div className={cn('itemList')}>
                {currentSummonerMatchData.itemNumberList.map(
                  (itemNumber, i) => (
                    <ItemIcon
                      className={cn('itemIcon')}
                      itemNumber={itemNumber}
                      key={i}
                    />
                  ),
                )}
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
        <div onClick={cardOpenHandler} className={cn('setOpenButton')}>
          <IoIosArrowDown className={cn('setOpenIcon', { open: isOpen })} />
        </div>
      </div>

      {isOpen && <MatchDetailContainer matchData={matchData} />}
    </li>
  );
}
