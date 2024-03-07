import styles from './perksIcon.module.scss';
import classNames from 'classnames/bind';
import CustomTooltip from 'components/tooltip/CustomTooltip';
import { getPerksData } from 'utils/getLocalData';
const cn = classNames.bind(styles);

type Props = {
  className?: string;
  perksStyle: number;
};

export default function PerksIcon({ className, perksStyle }: Props) {
  const perksDetail = getPerksData(perksStyle);
  if (perksDetail.shortDesc) {
    return (
      <CustomTooltip
        title={perksDetail.name}
        body={perksDetail.shortDesc}
        name={perksDetail.name}
      >
        <div className={cn('perksIcon', className)}>
          <img src={perksDetail.icon} alt="소환사 룬 아이콘" />
        </div>
      </CustomTooltip>
    );
  }
  return (
    <div className={cn('perksIcon', className)}>
      <img src={perksDetail.icon} alt="소환사 룬 아이콘" />
    </div>
  );
}
