import classNames from 'classnames/bind';
import CustomTooltip from 'components/common/tooltip/CustomTooltip';
import { getChampionData } from 'utils/getLocalData';
import styles from './championIcon.moule.scss';

const cn = classNames.bind(styles);

type Props = {
  className?: string;
  championName: string;
  championLevel?: number;
};

/**
 * 챔피언 이름과 레벨을 받아 챔피언 이미지를 렌더링 합니다.
 * @param {string} className - 클래스네임 입니다. (선택 사항)
 * @param {string} championName - 챔피언 이름입니다.
 * @param {number} championLevel - 챔피언 레벨입니다. (선택 사항)
 * @return 챔피언 아이콘
 */

export default function ChampionIcon({
  championName,
  className,
  championLevel,
}: Props) {
  // 챔피언의 상세 정보를 받아와 저장합니다.
  const championDetail = getChampionData(championName);
  const { name, icon } = championDetail;
  return (
    <CustomTooltip name={name || ''} body={name || ''}>
      <div className={cn('championIcon', className)}>
        <img src={icon || ''} alt={`${name || ''} 아이콘`} loading="lazy" />
        <div className={cn('championLevel')}>{championLevel}</div>
      </div>
    </CustomTooltip>
  );
}
