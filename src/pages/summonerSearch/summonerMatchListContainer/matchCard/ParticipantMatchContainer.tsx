import { MatchData } from 'types/summoner';
import styles from './matchCard.module.scss';
import classNames from 'classnames/bind';
import usePathSummonerData from 'hooks/usePathSummonerData';
import useCustomNavigation from 'hooks/useCustomNavigation';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import getCommaSeparatedNumber from 'utils/getCommaSeparatedNumber';
import ParticipantMatchTeamContainer from './ParticipantMatchTeamContainer';
const cn = classNames.bind(styles);

type Props = {
  matchData: MatchData;
};

export default function ParticipantMatchContainer({ matchData }: Props) {
  const {
    info: { maxData },
  } = matchData;
  const { country } = usePathSummonerData();
  const { navSummonerSearch } = useCustomNavigation();
  console.log(matchData);
  return (
    <div className={cn('participantMatchContainer')}>
      <div className={cn('maxData')}>
        <div>
          <div className={cn('title')}>최고 딜량</div>
          <div className={cn('value')}>
            {getCommaSeparatedNumber(maxData.maxDamage.damage)}
          </div>
          <div className={cn('summoner')}>
            <ChampionIcon
              championName={maxData.maxDamage.championName}
              className={cn('maxDataIcon')}
            />
            <span>{maxData.maxDamage.riotGameName}</span>
          </div>
        </div>
        <div>
          <div className={cn('title')}>최다 킬</div>
          <div className={cn('value')}>{maxData.maxKill.kill}</div>
          <div className={cn('summoner')}>
            <ChampionIcon
              championName={maxData.maxKill.championName}
              className={cn('maxDataIcon')}
            />
            <span>{maxData.maxKill.riotGameName}</span>
          </div>
        </div>
        <div>
          <div className={cn('title')}>최다 데스</div>
          <div className={cn('value')}>{maxData.maxDeath.death}</div>
          <div className={cn('summoner')}>
            <ChampionIcon
              championName={maxData.maxDeath.championName}
              className={cn('maxDataIcon')}
            />
            <span>{maxData.maxDeath.riotGameName}</span>
          </div>
        </div>
        <div>
          <div className={cn('title')}>최다 어시스트</div>
          <div className={cn('value')}>{maxData.maxAssist.assist}</div>
          <div className={cn('summoner')}>
            <ChampionIcon
              championName={maxData.maxAssist.championName}
              className={cn('maxDataIcon')}
            />
            <span>{maxData.maxAssist.riotGameName}</span>
          </div>
        </div>
      </div>
      <div>
        <ParticipantMatchTeamContainer
          teamData={matchData.blue}
          maxDamage={maxData.maxDamage.damage}
          teamName="블루팀"
        />
        <ParticipantMatchTeamContainer
          teamData={matchData.red}
          maxDamage={maxData.maxDamage.damage}
          teamName="레드팀"
        />
      </div>
    </div>
  );
}
