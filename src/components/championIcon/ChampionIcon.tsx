import styles from './championIcon.moule.scss';
import classNames from 'classnames/bind';
import URL from 'constants/url';
import CustomTooltip from 'components/tooltip/CustomTooltip';
import { getChampionData } from 'utils/getLocalData';
const cn = classNames.bind(styles);

type Props = {
  className?: string;
  championName: string;
};

export default function ChampionIcon({ championName, className }: Props) {
  const championDetail = getChampionData(championName);
  const championIconUrl = URL.championIcon(championName);

  return (
    <CustomTooltip name={championDetail.name} body={championDetail.name}>
      <div className={cn('championIcon', className)}>
        <img src={championIconUrl} alt="아이템 아이콘" />
      </div>
    </CustomTooltip>
  );
}
