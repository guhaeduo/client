import styles from './findDuoPage.module.scss';
import classNames from 'classnames/bind';
import LaneSelector from 'components/laneSelector/LaneSelector';
import DropDown from 'components/dropDown/DropDown';
import useFindDuo from 'hooks/business/useFindDuo';
const cn = classNames.bind(styles);

export default function FindDuoPage() {
  const {
    tierOptions,
    setTierOptions,
    queueOptions,
    setQueueOptions,
    laneOptions,
    setLaneOptions,
    isTierDropDownOpen,
    setIsTierDropDownOpen,
    isQueueDropDownOpen,
    setIsQueueDropDownOpen,
  } = useFindDuo();
  return (
    <div>
      <div
        className={cn('duoHeader')}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/images/duoHeader.png'}) `,
        }}
      />
      <div className={cn('main', 'container')}>
        <div className={cn('Menu')}>
          <DropDown />
          <DropDown />
          <LaneSelector />
        </div>
      </div>
    </div>
  );
}
