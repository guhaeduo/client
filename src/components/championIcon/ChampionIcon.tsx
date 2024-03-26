import styles from './championIcon.moule.scss';
import classNames from 'classnames/bind';
import CustomTooltip from 'components/tooltip/CustomTooltip';
import { getChampionData } from 'utils/getLocalData';
const cn = classNames.bind(styles);

type Props = {
  className?: string;
  championName: string;
};

/**
 * 미리 스타일을 지정해둔 챔피언 아이콘입니다.
 * @param {string?} className - 클래스네임 입니다.
 * @param {string} championName - 챔피언 이름입니다.
 */

export default function ChampionIcon({ championName, className }: Props) {
  // 챔피언의 상세 정보를 받아와 저장합니다.
  const championDetail = getChampionData(championName);
  return (
    <CustomTooltip
      name={championDetail?.name || ''}
      body={championDetail?.name || ''}
    >
      <div className={cn('championIcon', className)}>
        <img
          src={championDetail?.icon || ''}
          alt={`${championDetail?.name || ''} 아이콘`}
          loading="lazy"
        />
      </div>
    </CustomTooltip>
  );
}
