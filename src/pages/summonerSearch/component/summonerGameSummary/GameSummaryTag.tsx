import { SummaryChampionStats } from 'types/summoner';
import getChampionData from 'utils/getChampionData';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import styles from './summonerGameSummaryContainer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  champion: SummaryChampionStats;
  currentDetailChampion: SummaryChampionStats;
  setCurrentDetailChampion: React.Dispatch<
    React.SetStateAction<SummaryChampionStats | null>
  >;
};

export default function GameSummaryTag({
  champion,
  currentDetailChampion,
  setCurrentDetailChampion,
}: Props) {
  const championDetail = getChampionData(champion.championName);
  console.log(champion);
  const isActive = currentDetailChampion.championName === champion.championName;
  const onClickHandler = () => setCurrentDetailChampion(champion);
  return (
    <div
      onClick={onClickHandler}
      className={cn('championTag', { active: isActive })}
    >
      <ChampionIcon
        className={cn('championIcon')}
        championId={championDetail.id}
        championName={championDetail.name}
      />
      <div className={cn('championTagData')}>
        <span>{champion.winningRate}</span>
        <span>{champion.cntGame} 게임</span>
      </div>
      <span className={cn('championName')}>{championDetail.name}</span>
      <div className={cn('championToggle')} />
    </div>
  );
}