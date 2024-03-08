import styles from './findDuoPage.module.scss';
import classNames from 'classnames/bind';
import LaneSelector from 'components/laneSelector/LaneSelector';
import DropDown from 'components/dropDown/DropDown';
import useFindDuo from 'hooks/business/useFindDuo';
import { QUEUE, TIER } from 'constants/options';
const cn = classNames.bind(styles);

export default function FindDuoPage() {
  const {
    tierOption,
    setTierOption,
    queueOption,
    setQueueOption,
    laneOption,
    setLaneOption,
    isTierDropDownOpen,
    isTierDropDownOpenHandler,
    isQueueDropDownOpen,
    isQueueDropDownOpenHandler,
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
        <div className={cn('menu')}>
          <DropDown
            options={QUEUE}
            option={queueOption}
            onChange={setQueueOption}
            isOpen={isQueueDropDownOpen}
            setIsOpen={isQueueDropDownOpenHandler}
            type="border"
            className={cn('findDuoDropDown')}
          />
          <DropDown
            options={TIER}
            option={tierOption}
            onChange={setTierOption}
            isOpen={isTierDropDownOpen}
            setIsOpen={isTierDropDownOpenHandler}
            type="border"
            className={cn('findDuoDropDown')}
          />
          <LaneSelector
            option={laneOption}
            onChange={setLaneOption}
            size={33}
          />
        </div>
      </div>
    </div>
  );
}
