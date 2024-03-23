import { getItemData } from 'utils/getLocalData';
import styles from './itemIcon.module.scss';
import classNames from 'classnames/bind';
import CustomTooltip from 'components/tooltip/CustomTooltip';
const cn = classNames.bind(styles);

type Props = {
  className?: string;
  itemNumber: number;
  puuid?: string;
};

/**
 * 미리 스타일을 지정해둔 아이템 아이콘입니다.
 * @param {string?} className - 클래스네임 입니다.
 * @param {number} itemNumber - 아이템 번호입니다.
 */

export default function ItemIcon({ className, itemNumber, puuid }: Props) {
  // 아이템의 상세 정보를 받아와 저장합니다.
  const itemDetail = getItemData(itemNumber);

  // 만약 아이템이 없을 경우 nullItem을 리턴합니다.
  if (itemNumber === 0 || !itemDetail)
    return <div className={cn(className, 'nullItem')} />;

  return (
    <CustomTooltip
      name={itemDetail.name + puuid}
      title={itemDetail.name}
      body={itemDetail.description}
    >
      <div className={cn('itemIcon', className)}>
        <img src={itemDetail.icon} alt="아이템 아이콘" />
      </div>
    </CustomTooltip>
  );
}
