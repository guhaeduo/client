import { getItemData } from 'utils/getLocalData';
import classNames from 'classnames/bind';
import CustomTooltip from 'components/common/tooltip/CustomTooltip';
import styles from './itemIcon.module.scss';

const cn = classNames.bind(styles);

type Props = {
  className?: string;
  itemNumber: number;
  puuid?: string;
};

/**
 * 아이템 번호를 아이템 이미지를 렌더링 합니다.
 * @param {string} className - 클래스네임 입니다. (선택 사항)
 * @param {number} itemNumber - 아이템 번호입니다.
 * @return 아이템 아이콘 요소
 */

export default function ItemIcon({ className, itemNumber, puuid }: Props) {
  // 아이템의 상세 정보를 받아와 저장합니다.
  const itemDetail = getItemData(itemNumber);

  // 만약 아이템이 없을 경우 nullItem을 리턴합니다.
  if (itemNumber === 0 || !itemDetail)
    return <div className={cn(className, 'nullItem')} />;

  const { name, description, icon } = itemDetail;

  return (
    <CustomTooltip name={name + puuid} title={name} body={description}>
      <div className={cn('itemIcon', className)}>
        <img src={icon} alt="아이템 아이콘" loading="lazy" />
      </div>
    </CustomTooltip>
  );
}
