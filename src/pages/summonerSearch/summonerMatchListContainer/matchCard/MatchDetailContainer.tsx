import { MatchData } from 'types/summoner';
import styles from './matchCard.module.scss';
import classNames from 'classnames/bind';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import getCommaSeparatedNumber from 'utils/getCommaSeparatedNumber';
import MatchTeamContainer from './MatchTeamContainer';
import MatchTotalDataContainer from './MatchTotalDataContainer';
import useCustomNavigation from 'hooks/useCustomNavigation';
import usePathSummonerData from 'hooks/usePathSummonerData';
const cn = classNames.bind(styles);

type Props = {
  matchData: MatchData;
};

export default function MatchDetailContainer({ matchData }: Props) {
  const { info } = matchData;
  const { maxData } = info;
  const { country } = usePathSummonerData();
  const { navSummonerSearch } = useCustomNavigation();
  return (
    <div className={cn('participantMatchContainer')}>
      {info.quickShutdown || (
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
              <span
                className={cn('riotName')}
                onClick={() =>
                  navSummonerSearch({
                    country,
                    name: maxData.maxDamage.riotGameName,
                    tag: maxData.maxDamage.riotGameTag,
                  })
                }
              >
                {maxData.maxDamage.riotGameName}
              </span>
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
              <span
                className={cn('riotName')}
                onClick={() =>
                  navSummonerSearch({
                    country,
                    name: maxData.maxKill.riotGameName,
                    tag: maxData.maxKill.riotGameTag,
                  })
                }
              >
                {maxData.maxKill.riotGameName}
              </span>
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
              <span
                className={cn('riotName')}
                onClick={() =>
                  navSummonerSearch({
                    country,
                    name: maxData.maxDeath.riotGameName,
                    tag: maxData.maxDeath.riotGameTag,
                  })
                }
              >
                {maxData.maxDeath.riotGameName}
              </span>
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
              <span
                className={cn('riotName')}
                onClick={() =>
                  navSummonerSearch({
                    country,
                    name: maxData.maxAssist.riotGameName,
                    tag: maxData.maxAssist.riotGameTag,
                  })
                }
              >
                {maxData.maxAssist.riotGameName}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className={cn('participantContainer')}>
        <MatchTeamContainer
          teamData={matchData.blue}
          maxDamage={maxData.maxDamage.damage}
          teamName="블루팀"
        />
        {info.quickShutdown || (
          <MatchTotalDataContainer matchData={matchData} />
        )}
        <MatchTeamContainer
          teamData={matchData.red}
          maxDamage={maxData.maxDamage.damage}
          teamName="레드팀"
        />
      </div>
    </div>
  );
}
