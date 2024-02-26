import { MatchData } from 'types/summoner';
import { useMemo } from 'react';
import styles from './matchCard.module.scss';
import classNames from 'classnames/bind';
import calculateGameDuration from 'utils/calculateGameDuration';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import ItemIcon from 'components/itemIcon/ItemIcon';
import usePathSummonerData from 'hooks/usePathSummonerData';
import calculateGameEndStamp from 'utils/calculateGameEndStamp';
import ParticipantPreviewCard from './ParticipantPreviewCard';
import { IoIosArrowDown } from 'react-icons/io';
import SpellIcon from 'components/spellIcon/SpellIcon';
import PerksIcon from 'components/perksIcon/PerksIcon';
const cn = classNames.bind(styles);

type Props = {
  matchData: MatchData;
  cardOpenHandler: () => void;
  isOpen: boolean;
};
export default function CurrentSummonerMatchCard({
  matchData,
  cardOpenHandler,
  isOpen,
}: Props) {
  const { currentSummonerMatchData, info, red, blue } = matchData;
  const { country } = usePathSummonerData();
  const gameResult = info.quickShutdown
    ? '다시하기'
    : currentSummonerMatchData.win
      ? '승리'
      : '패배';
  const formattedGameDuration = useMemo(
    () => calculateGameDuration(info.gameDuration),
    [info.gameDuration],
  );
  const formattedGameEndStamp = useMemo(
    () => calculateGameEndStamp(info.gameEndStamp),
    [info.gameEndStamp],
  );
  return (
    <div className={cn('currentSummonerMatchCard')}>
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
                  perksStyle={currentSummonerMatchData.perks.main.perkIdList[0]}
                />
                <PerksIcon
                  className={cn('perksIcon')}
                  perksStyle={currentSummonerMatchData.perks.sub.perkStyle}
                />
              </div>
              <div className={cn('grade')}>
                <span>{currentSummonerMatchData.kill} /</span>
                <span> {currentSummonerMatchData.death} </span>
                <span>/ {currentSummonerMatchData.assists}</span>
              </div>
            </div>
            <div className={cn('itemList')}>
              {currentSummonerMatchData.itemNumberList.map((itemNumber, i) => (
                <ItemIcon
                  className={cn('itemIcon')}
                  itemNumber={itemNumber}
                  key={i}
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
      <div onClick={cardOpenHandler} className={cn('setOpenButton')}>
        <IoIosArrowDown className={cn('setOpenIcon', { open: isOpen })} />
      </div>
    </div>
  );
}
