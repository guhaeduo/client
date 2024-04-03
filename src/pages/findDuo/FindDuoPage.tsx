import { SiRiotgames } from 'react-icons/si';
import classNames from 'classnames/bind';
import DropDown from 'components/common/dropDown/DropDown';
import useDuoPostWriteForm from 'hooks/business/useFindDuo';
import { QUEUE, TIER, LANE } from 'constants/options';
import LoadingButton from 'components/common/loadingButton/LoadingButton';
import Modal from 'components/common/modal/Modal';
import { useState } from 'react';
import SEOMeta from 'components/SEOMeta';
import SEO_DATA from 'constants/seoData';
import { IoArrowDownOutline } from 'react-icons/io5';
import PostsContainerSkeleton from './components/skeleton/PostsContainerSkeleton';
import PostWriteModal from './components/postWriteModal/PostWriteModal';
import PostsContainer from './components/postsContainer/PostsContainer';
import styles from './findDuoPage.module.scss';

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
    setIsTierDropDownOpen,
    isQueueDropDownOpen,
    setIsQueueDropDownOpen,
    isLaneDropDownOpen,
    setIsLaneDropDownOpen,
    isRiotVerified,
    isRiotVerifiedHandler,
    postData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    onQueryUpdateHandler,
  } = useDuoPostWriteForm();

  const onPostWriteBtnClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  return (
    <>
      <SEOMeta pageData={SEO_DATA.findDuo} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <PostWriteModal
          setQueueOption={setQueueOption}
          setIsOpen={setIsOpen}
          onQueryUpdateHandler={onQueryUpdateHandler}
        />
      </Modal>
      <div>
        <div
          className={cn('duoHeader')}
          style={{
            backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/duoHeader.png`}) `,
          }}
        />
        <div className={cn('main', 'container')}>
          <div className={cn('menu')}>
            <div className={cn('dropMenu')}>
              <DropDown
                label="듀오 검색 게임 타입 메뉴"
                options={QUEUE}
                currentOptionKey={queueOption}
                onChange={setQueueOption}
                isOpen={isQueueDropDownOpen}
                setIsOpen={setIsQueueDropDownOpen}
                type="border"
                className={cn('findDuoDropDown', 'queueType')}
              />
              <DropDown
                label="듀오 검색 티어 선택 메뉴"
                options={TIER}
                currentOptionKey={tierOption}
                onChange={setTierOption}
                isOpen={isTierDropDownOpen}
                setIsOpen={setIsTierDropDownOpen}
                type="border"
                className={cn('findDuoDropDown', 'tier')}
              />
              <DropDown
                label="듀오 검색 라인 선택 메뉴"
                options={LANE}
                currentOptionKey={laneOption}
                onChange={setLaneOption}
                isOpen={isLaneDropDownOpen}
                setIsOpen={setIsLaneDropDownOpen}
                type="border"
                className={cn('findDuoDropDown', 'lane')}
              />
            </div>
            <div className={cn('buttons')}>
              <button
                onClick={isRiotVerifiedHandler}
                className={cn('riotVerifiedBtn', { verified: isRiotVerified })}
              >
                <div className={cn('riotBadge')}>
                  <SiRiotgames />
                </div>
                <span>인증된 소환사만</span>
              </button>
              <LoadingButton
                isFetching={isFetching}
                onClickHandler={onQueryUpdateHandler}
                className={cn('duoUpdateBtn')}
              >
                업데이트
              </LoadingButton>
              <button
                className={cn('writePostBtn')}
                onClick={onPostWriteBtnClick}
              >
                글쓰기
              </button>{' '}
            </div>
          </div>
          {postData?.length && (
            <>
              <PostsContainer
                postsData={postData}
                isFetchingNextPage={isFetchingNextPage}
                setQueueOption={setQueueOption}
                onQueryUpdateHandler={onQueryUpdateHandler}
              />
              {hasNextPage && !isFetchingNextPage && (
                <div className={cn('findDuoFooter')}>
                  <button
                    className={cn('moreBtn')}
                    onClick={() => fetchNextPage()}
                  >
                    <IoArrowDownOutline />
                  </button>
                </div>
              )}
            </>
          )}
          {postData?.length && isFetching && <PostsContainerSkeleton />}
          {!postData?.length && !isFetching && (
            <div className={cn('postsNotFound')}>
              게시글이 존재하지 않습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
