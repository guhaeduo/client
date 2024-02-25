import CustomTooltip from 'components/tooltip/CustomTooltip';
import { getSpellData } from 'utils/getLocalData';
import styles from './spellIcon.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type Props = {
  spellNumber: number;
  className?: string;
};
export default function SpellIcon({ spellNumber, className }: Props) {
  const spellDetail = getSpellData(spellNumber);
  const { name, description, icon } = spellDetail;
  return (
    <CustomTooltip title={name} body={description} name={name}>
      <div className={cn('spellIcon', className)}>
        <img src={icon} alt="소환사 스펠 아이콘" />
      </div>
    </CustomTooltip>
  );
}
