import styles from './championIcon.moule.scss';
import classNames from 'classnames/bind';
import URL from 'constants/url';
import CustomTooltip from 'components/tooltip/CustomTooltip';
import { getChampionData } from 'utils/getLocalData';
import { Tooltip } from 'react-tooltip';
const cn = classNames.bind(styles);

type Props = {
  className?: string;
  championName: string;
};

export default function ChampionIcon({ championName, className }: Props) {
  const championDetail = getChampionData(championName);
  const championIconUrl = URL.championIcon(championDetail.id);
  const tooltipName = championDetail.name.split(' ').join('');
  const tooltipSelect = '.' + tooltipName;

  return (
    <CustomTooltip
      tooltipName={tooltipName}
      tooltipSelect={tooltipSelect}
      title={championDetail.name}
    >
      <div className={cn('championIcon', className)}>
        <img
          className={cn(className)}
          src={championIconUrl}
          alt="아이템 아이콘"
        />
      </div>
    </CustomTooltip>
  );
}
