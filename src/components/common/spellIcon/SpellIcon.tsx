import CustomTooltip from 'components/common/tooltip/CustomTooltip';
import { getSpellData } from 'utils/getLocalData';
import classNames from 'classnames/bind';
import styles from './spellIcon.module.scss';

const cn = classNames.bind(styles);

type Props = {
  spellNumber: number;
  className?: string;
};

/**
 * 미리 스타일을 지정해둔 스펠 아이콘입니다.
 * @param {number} spellNumber - 스펠 번호입니다.
 * @param {string} className - 스펠 아이콘 클래스 입니다. (선택 사항)
 */

export default function SpellIcon({ spellNumber, className }: Props) {
  // 스펠 번호를 통해 스펠 데이터를 받아옵니다.
  const spellDetail = getSpellData(spellNumber);
  const { name, description, icon } = spellDetail;
  return (
    <CustomTooltip title={name} body={description} name={name}>
      <div className={cn('spellIcon', className)}>
        <img src={icon} alt="소환사 스펠 아이콘" loading="lazy" />
      </div>
    </CustomTooltip>
  );
}
