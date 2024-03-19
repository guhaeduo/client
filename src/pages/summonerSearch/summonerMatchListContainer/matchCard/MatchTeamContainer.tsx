import { Team } from 'types/summoner';
import styles from './matchCard.module.scss';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import classNames from 'classnames/bind';
import SpellIcon from 'components/spellIcon/SpellIcon';
import PerksIcon from 'components/perksIcon/PerksIcon';
import useCustomNavigation from 'hooks/useCustomNavigation';
import usePathSummonerData from 'hooks/usePathSummonerData';
import { calculateGrade, calculateDamagePercentage } from 'utils/calculate';
import getCommaSeparatedNumber from 'utils/getCommaSeparatedNumber';
import ItemIcon from 'components/itemIcon/ItemIcon';
import CustomTooltip from 'components/tooltip/CustomTooltip';
const cn = classNames.bind(styles);

type Props = {
  teamName: string;
  teamData: Team;
  maxDamage: number;
  currentSummonerPuuid: string;
};
export default function MatchTeamContainer({
  teamName,
  teamData,
  maxDamage,
  currentSummonerPuuid,
}: Props) {
  const result = teamData.win ? '승리' : '패배';
  const { navSummonerSearch } = useCustomNavigation();
  const { country } = usePathSummonerData();
  return (
    <div
      className={cn('matchTeamContainer', {
        win: teamData.win,
        lose: !teamData.win,
      })}
    >
      <div className={cn('header')}>
        <div className={cn('result')}>
          <span>{result}</span>({teamName})
        </div>
        <div className={cn('data')}>
          <span className={cn('kda')}>KDA</span>
          <span className={cn('damage')}>피해량</span>
          <span className={cn('wards')}>와드</span>
          <span className={cn('cs')}>CS</span>
        </div>
        <span className={cn('item')}>아이템</span>
      </div>
      <div className={cn('participantsContainer')}>
        {teamData.participants.map((participant) => (
          <div
            key={participant.puuid}
            className={cn('participantMatchCard', {
              currentUser: currentSummonerPuuid === participant.puuid,
            })}
          >
            <div className={cn('summonerData')}>
              <ChampionIcon
                championName={participant.championName}
                className={cn('championIcon')}
              />
              <div className={cn('summonerSkills')}>
                <SpellIcon
                  className={cn('spellIcon')}
                  spellNumber={participant.spell1Id}
                />
                <SpellIcon
                  className={cn('spellIcon')}
                  spellNumber={participant.spell2Id}
                />
                <PerksIcon
                  className={cn('perksIcon')}
                  perksStyle={participant.perks.main.perkIdList[0]}
                />
                <PerksIcon
                  className={cn('perksIcon')}
                  perksStyle={participant.perks.sub.perkStyle}
                />
              </div>
              <div className={cn('summonerName')}>
                <span
                  onClick={() =>
                    navSummonerSearch({
                      country,
                      name: participant.riotGameName,
                      tag: participant.riotGameTag,
                    })
                  }
                  className={cn('name')}
                >
                  {participant.riotGameName}
                </span>
                <span className={cn('tag')}>#{participant.riotGameTag}</span>
              </div>
            </div>
            <div className={cn('data')}>
              <div className={cn('kda')}>
                <div className={cn('summonerKda')}>
                  <span>{participant.kill} /</span>
                  <span> {participant.death} </span>
                  <span>/ {participant.assists}</span>
                </div>
                <div className={cn('grade')}>
                  {calculateGrade(
                    participant.kill,
                    participant.death,
                    participant.assists,
                  )}
                  :1
                </div>
              </div>
              <div className={cn('damage')}>
                <span>{getCommaSeparatedNumber(participant.totalDamage)}</span>
                <div className={cn('damageBar')}>
                  <div
                    style={{
                      width: `${calculateDamagePercentage(
                        maxDamage,
                        participant.totalDamage,
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <CustomTooltip
                body={`시야 점수 - ${participant.visionScore} 제어 와드 - ${participant.visionWards} 와드설치 - ${participant.wardPlaced}`}
                name={`${currentSummonerPuuid}wards`}
              >
                <div className={cn('wards')}>
                  <span className={cn('visionScore')}>
                    {participant.visionScore}
                  </span>
                  <span>
                    {participant.visionWards} / {participant.wardPlaced}
                  </span>
                </div>
              </CustomTooltip>
              <div className={cn('cs')}>
                <span className={cn('minionKill')}>
                  {participant.minionKill}
                </span>
                <span>분당 {participant.csPerMinute}</span>
              </div>
            </div>
            <div className={cn('item')}>
              {participant.itemNumberList.map((itemNumber, i) => (
                <ItemIcon
                  className={cn('itemIcon')}
                  key={i}
                  itemNumber={itemNumber}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
