import styles from './perksIcon.module.scss';
import classNames from 'classnames/bind';
import CustomTooltip from 'components/tooltip/CustomTooltip';
import { getPerksData } from 'utils/getLocalData';
const cn = classNames.bind(styles);

type Props = {
  className?: string;
  perksStyle: number;
};

/**
 * 미리 스타일을 지정해둔 룬 아이콘입니다..
 * @param {string} className - 클래스입니다.
 * @param {number} perksStyle - 룬 번호입니다.
 */

export default function PerksIcon({ className, perksStyle }: Props) {
  // 룬 번호에 맞는 데이터를 가져옵니다.
  const perksDetail = getPerksData(perksStyle);

  if (!perksDetail) return <></>;

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
