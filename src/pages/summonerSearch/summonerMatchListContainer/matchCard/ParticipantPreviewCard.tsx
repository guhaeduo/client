import ChampionIcon from 'components/championIcon/ChampionIcon';
import CustomTooltip from 'components/tooltip/CustomTooltip';
import { Participant } from 'types/summoner';
import styles from './matchCard.module.scss';
import classNames from 'classnames/bind';
import useCustomNavigation from 'hooks/useCustomNavigation';

const cn = classNames.bind(styles);

type Props = {
  championName: string;
  participant: Participant;
  currentSummonerMatchData: Participant;
  country: string;
};

export default function ParticipantPreviewCard({
  championName,
  participant,
  currentSummonerMatchData,
  country,
}: Props) {
  const { navSummonerSearch } = useCustomNavigation();
  return (
    <div>
      <ChampionIcon className={cn('previewIcon')} championName={championName} />
      <CustomTooltip
        name={
          participant.championName +
          participant.riotGameName +
          participant.riotGameTag
        }
        body={`${participant.riotGameName} #${participant.riotGameTag}`}
      >
        <p
          onClick={() =>
            navSummonerSearch({
              country,
              name: participant.riotGameName,
              tag: participant.riotGameTag,
            })
          }
          className={cn('previewSummonerInfo', {
            activeSummoner:
              participant.puuid === currentSummonerMatchData.puuid,
          })}
        >
          {participant.riotGameName}
        </p>
      </CustomTooltip>
    </div>
  );
}
