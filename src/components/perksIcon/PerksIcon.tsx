import { Perks } from 'types/summoner';
import styles from './perksIcon.module.scss';
import classNames from 'classnames/bind';
import CustomTooltip from 'components/tooltip/CustomTooltip';
const cn = classNames.bind(styles);

type Props = {
  className: string;
  type: 'main' | 'sub';
  perks: Perks;
};
export default function PerksIcon({ className, type, perks }: Props) {
  console.log(perks);
  return <div></div>;
}
