import { SiRiotgames } from 'react-icons/si';
import styles from './findDuoPage.module.scss';
import classNames from 'classnames/bind';
import LaneSelector from 'components/laneSelector/LaneSelector';
import DropDown from 'components/dropDown/DropDown';
import useFindDuo from 'hooks/business/useFindDuo';
import { QUEUE, TIER } from 'constants/options';
import LoadingButton from 'components/loadingButton/LoadingButton';
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
    isRiotVerified,
    isRiotVerifiedHandler,
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
          <LoadingButton
            isFetching={false}
            onClickHandler={() => console.log('')}
            className={cn('duoUpdateBtn')}
          >
            업데이트
          </LoadingButton>
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
            size={30}
          />
          <button
            onClick={isRiotVerifiedHandler}
            className={cn('riotVerifiedBtn', { verified: isRiotVerified })}
          >
            <div className={cn('riotBadge')}>
              <SiRiotgames />
            </div>
            <span>인증된 소환사만</span>
          </button>
          <button className={cn('writePostBtn')}>글쓰기</button>
        </div>
      </div>
    </div>
  );
}
