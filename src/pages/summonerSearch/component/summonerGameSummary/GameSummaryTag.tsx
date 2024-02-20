import { SummaryChampionStats } from 'types/summoner';
import getChampionData from 'utils/getChampionData';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import styles from './summonerGameSummaryContainer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  champion: SummaryChampionStats;
};

export default function GameSummaryTag({ champion }: Props) {
  const championDetail = getChampionData(champion.championName);
  console.log(championDetail);
  return (
    <div className={cn('championTag')}>
      <ChampionIcon
        className={cn('championIcon')}
        championId={championDetail.id}
        championName={championDetail.name}
      />
      <div className={cn('championTagData')}>
        <span>{championDetail.name}</span>
        <span>{champion.winningRate}</span>
      </div>
    </div>
  );
}
