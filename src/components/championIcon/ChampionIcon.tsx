import styles from './championIcon.moule.scss';
import classNames from 'classnames/bind';
import URL from 'constants/url';
import Tooltip from 'components/tooltip/Tooltip';
const cn = classNames.bind(styles);

type Props = {
  className?: string;
  championId: string;
  championName: string;
};

export default function ChampionIcon({
  championId,
  championName,
  className,
}: Props) {
  const championIconUrl = URL.championIcon(championId);
  return (
    <Tooltip title={championName} minWidth={50}>
      <div className={cn('championIcon', className)}>
        <img src={championIconUrl} alt="챔피언 아이콘" />
      </div>
    </Tooltip>
  );
}
