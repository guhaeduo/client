import classNames from 'classnames/bind';
import CustomTooltip from 'components/common/tooltip/CustomTooltip';
import { getPerksData } from 'utils/getLocalData';
import styles from './perksIcon.module.scss';

const cn = classNames.bind(styles);

type Props = {
  className?: string;
  perksStyle: number;
};

/**
 * 룬 스타일을 입력 받아 룬 이미지를 렌더링 합니다.
 * @param {string} className - 클래스입니다. (선택 사항)
 * @param {number} perksStyle - 룬 번호입니다.
 * @return 룬 아이콘
 */

export default function PerksIcon({ className, perksStyle }: Props) {
  // 룬 번호에 맞는 데이터를 가져옵니다.
  const perksDetail = getPerksData(perksStyle);

  if (!perksDetail) return null;

  // 룬 상세 정보가 있을 경우와 없을 경우를 나누어 렌더링합니다.
  if (perksDetail.shortDesc) {
    return (
      <CustomTooltip
        title={perksDetail.name}
        body={perksDetail.shortDesc}
        name={perksDetail.name}
      >
        <div className={cn('perksIcon', className)}>
          <img src={perksDetail.icon} alt="소환사 룬 아이콘" loading="lazy" />
        </div>
      </CustomTooltip>
    );
  }
  return (
    <div className={cn('perksIcon', className)}>
      <img src={perksDetail.icon} alt="소환사 룬 아이콘" loading="lazy" />
    </div>
  );
}
