// import Tooltip from 'components/tooltip/Tooltip';
import { getItemData } from 'utils/getLocalData';
import URL from 'constants/url';
import styles from './itemIcon.module.scss';
import classNames from 'classnames/bind';
import CustomTooltip from 'components/tooltip/CustomTooltip';
const cn = classNames.bind(styles);

type Props = {
  className?: string;
  itemNumber: number;
};
export default function ItemIcon({ className, itemNumber }: Props) {
  const itemDetail = getItemData(itemNumber);
  const itemIconUrl = URL.itemIcon(itemNumber);
  if (itemNumber === 0) return <div className={cn(className, 'nullItem')} />;
  const tooltipName = itemDetail.name.split(' ').join('');
  const tooltipSelect = '.' + tooltipName;
  return (
    <CustomTooltip
      tooltipName={tooltipName}
      tooltipSelect={tooltipSelect}
      title={itemDetail.name}
      body={itemDetail.description}
    >
      <div className={cn('itemIcon', className)}>
        <img src={itemIconUrl} alt="아이템 아이콘" />
      </div>
    </CustomTooltip>
  );
}
