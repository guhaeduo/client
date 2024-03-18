import { SiRiotgames } from 'react-icons/si';
import styles from './findDuoPage.module.scss';
import classNames from 'classnames/bind';
import LaneSelector from 'components/laneSelector/LaneSelector';
import DropDown from 'components/dropDown/DropDown';
import useFindDuo from 'hooks/business/useFindDuo';
import { QUEUE, TIER } from 'constants/options';
import LoadingButton from 'components/loadingButton/LoadingButton';
import Modal from 'components/modal/Modal';
import { useState } from 'react';
import PostModal from './components/PostModal';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';
const cn = classNames.bind(styles);

export default function FindDuoPage() {
  const [isOpen, setIsOpen] = useState(false);
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

  const onPostWriteBtnClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <SEOMeta pageData={SEO_DATA.findDuo} />
      <div>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <PostModal setIsOpen={setIsOpen} />
        </Modal>
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
              currentOptionKey={queueOption}
              onChange={setQueueOption}
              isOpen={isQueueDropDownOpen}
              setIsOpen={isQueueDropDownOpenHandler}
              type="border"
              className={cn('findDuoDropDown')}
            />
            <DropDown
              options={TIER}
              currentOptionKey={tierOption}
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
            <button
              className={cn('writePostBtn')}
              onClick={onPostWriteBtnClick}
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
