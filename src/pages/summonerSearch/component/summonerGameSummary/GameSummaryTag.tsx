import { SummaryChampionStats } from 'types/summoner';
import getChampionData from 'utils/getChampionData';
import ChampionIcon from 'components/championIcon/ChampionIcon';
type Props = {
  champion: SummaryChampionStats;
};

export default function GameSummaryTag({ champion }: Props) {
  const championDetail = getChampionData(champion.championName);
  console.log(championDetail);
  return (
    <div>
      <ChampionIcon
        championId={championDetail.id}
        championName={championDetail.name}
      />
    </div>
  );
}
