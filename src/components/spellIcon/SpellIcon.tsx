import URL from 'constants/url';
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
  const { id, name, description } = spellDetail;
  const spellIconUrl = URL.spellIcon(id);
  return (
    <CustomTooltip title={name} body={description} name={id}>
      <div className={cn('spellIcon', className)}>
        <img src={spellIconUrl} alt="소환사 스펠 아이콘" />
      </div>
    </CustomTooltip>
  );
}