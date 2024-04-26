import classNames from 'classnames/bind';
import URL from 'constants/url';
import ChampionIcon from 'components/common/championIcon/ChampionIcon';
import { QUEUE } from 'constants/options';
import { BsThreeDots } from 'react-icons/bs';
import Modal from 'components/common/modal/Modal';
import { PostContent } from 'types/post';
import clipBoardCopy from 'utils/clipBoardCopy';
import { MouseEventHandler, useRef, useState, useEffect } from 'react';
import useHandleOutsideClick from 'hooks/useHandleOustsideClick';
import { calculateTimeStamp } from 'utils/calculate';
import { IoMic } from 'react-icons/io5';
import { SiRiotgames } from 'react-icons/si';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { Link } from 'react-router-dom';
import PostDeleteModal from '../postDeleteModal/PostDeleteModal';
import PostModal from '../postModal/PostModal';
import PostWriteModal from '../postWriteModal/PostWriteModal';
import styles from './postsContainer.module.scss';

const cn = classNames.bind(styles);

type Props = {
  postData: PostContent;
  setQueueOption: (queueOption: string) => void;
  onQueryClearHandler: () => void;
};

/**
 * 듀오 게시글 아이템 입니다.
 * @param {PostContent} postData - 게시글 데이터
 * @param {(queueOption : string) => void} setQueueOption - 듀오 게시판 게임 타입 필터 옵션 변경 함수
 * @param {() => void} onQueryClearHandler - 쿼리 업데이트 핸들러 함수
 */

export default function PostItem({
  postData,
  setQueueOption,
  onQueryClearHandler,
}: Props) {
  // 게시글 옵션 열림 여부
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  // 게시글 조회 모달 열림 여부
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  // 게시글 수정 모달 열림 여부
  const [isPostModifyModalOpen, setIsPostModifyModalOpen] = useState(false);
  // 게시글 삭제 모달 열림 여부
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  // 게시글 작성 시간
  const [timeStamp, setTimeStamp] = useState('');

  const {
    riotGameName,
    riotGameTag,
    createdAt,
    summonerIconNumber,
    isMicOn,
    isRiotVerified,
    queueType,
    soloRankTier,
    freeRankTier,
    myMainLane,
    myMainChampionName,
    needPosition,
    memo,
    isGuestPost,
    memberId,
  } = postData;

  // 게시글 옵션 박스의 주소를 저장합니다.
  const optionBoxRef = useRef(null);

  // 전역 상태에서 유저 정보를 가져옵니다.
  const user = useSelector(selectUser);

  // 영문 게임 타입을 한글로 변경합니다.
  const gameType = QUEUE.find((queue) => queue.key === queueType)
    ?.display as string;

  /** 옵션 버튼 클릭시 실행되는 함수입니다. */
  const onOptionBtnClickHandler = () => {
    // 옵션 박스를 엽니다.
    setIsOptionOpen((prevOpen) => !prevOpen);
  };

  /** 소환사 이름 복사 클릭시 실행되는 함수입니다. */
  const onSummonerNameCopyHandler: MouseEventHandler = (e) => {
    // 이벤트 버블링을 막습니다.
    e.stopPropagation();
    // 클립보드 복사 함수에 소환사 이름과 태그를 전달합니다.
    clipBoardCopy(`${riotGameName}#${riotGameTag}`);
  };

  /** 게시글 아이템 클릭시 실행되는 함수입니다. */
  const onPostItemClickHandler: MouseEventHandler = (e) => {
    // 이벤트 버블링을 막습니다.
    e.stopPropagation();
    // 게시글 조회 모달을 엽니다.
    setIsPostModalOpen(true);
  };

  useEffect(() => {
    // 매 초마다 게시글의 작성 시간을 업데이트 합니다.
    const timeStampInterval = setInterval(() => {
      setTimeStamp(calculateTimeStamp(createdAt));
    }, 1000);
    return () => clearInterval(timeStampInterval);
  }, []);

  /** 게시글 수정 버튼 클릭시 실행되는 함수입니다.   */
  const onPostModifyBtnClickHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    // 게시글 수정 모달을 엽니다.
    setIsPostModifyModalOpen(true);
    // 옵션 박스를 닫습니다.
    setIsOptionOpen(false);
  };

  /** 게시글 삭제 버튼 클릭시 실행되는 함수입니다.   */
  const onPostDeleteBtnClickHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    // 게시글 삭제 모달을 엽니다.
    setIsPostDeleteModalOpen(true);
    // 옵션 박스를 닫습니다.
    setIsOptionOpen(false);
  };

  // 옵션 박스가 열려있을 때, 옵션 박스가 아닌 다른곳을 누르면 옵션 박스를 닫습니다.
  useHandleOutsideClick({
    isOpen: isOptionOpen,
    setIsOpen: setIsOptionOpen,
    ref: optionBoxRef,
  });

  return (
    <>
      <Modal
        isOpen={isPostModifyModalOpen}
        setIsOpen={setIsPostModifyModalOpen}
      >
        <PostWriteModal
          setQueueOption={setQueueOption}
          setIsOpen={setIsPostModifyModalOpen}
          postData={postData}
          onQueryClearHandler={onQueryClearHandler}
        />
      </Modal>
      <Modal isOpen={isPostModalOpen} setIsOpen={setIsPostModalOpen}>
        <PostModal
          gameType={gameType}
          setIsOpen={setIsPostModalOpen}
          postData={postData}
        />
      </Modal>
      <Modal
        isOpen={isPostDeleteModalOpen}
        setIsOpen={setIsPostDeleteModalOpen}
      >
        <PostDeleteModal
          onQueryClearHandler={onQueryClearHandler}
          setIsOpen={setIsPostDeleteModalOpen}
          postData={postData}
        />
      </Modal>
      <div className={cn('postItem')}>
        <div onClick={onPostItemClickHandler} className={cn('postDataWrapper')}>
          <div className={cn('summonerInfo')}>
            <div className={cn('summonerIcon')}>
              <img
                src={URL.profileIcon(summonerIconNumber)}
                alt="소환사 프로필 아이콘"
              />
            </div>
            <div className={cn('basicData')}>
              <Link
                to={`/summoners/kr/${riotGameName}-${riotGameTag}`}
                className={cn('name')}
              >
                {riotGameName}
              </Link>
              <div className={cn('tag')}>
                <span>#{riotGameTag}</span>
                <button
                  className={cn('copy', 'copyBtn')}
                  onClick={onSummonerNameCopyHandler}
                >
                  복사
                </button>
                {isMicOn && <IoMic className={cn('mic')} />}
                {isRiotVerified && (
                  <div className={cn('riotBadge')}>
                    <SiRiotgames />
                  </div>
                )}
              </div>{' '}
            </div>
          </div>
          <div className={cn('gameType')}>{gameType}</div>
          {queueType !== 'FREE' && (
            <div className={cn('tier')}>
              <img src={URL.tierIcon(soloRankTier)} alt="솔랭 티어" />
            </div>
          )}
          {queueType === 'FREE' && (
            <div className={cn('tier')}>
              <img src={URL.tierIcon(freeRankTier)} alt="자랭 티어" />
            </div>
          )}{' '}
          <div>
            <img
              src={URL.laneIcon(myMainLane)}
              className={cn('lane')}
              alt="메인 포지션"
            />
          </div>
          <ChampionIcon
            className={cn('champion')}
            championName={myMainChampionName}
          />
          <div>
            <img
              src={URL.laneIcon(needPosition)}
              className={cn('lane')}
              alt="찾는 포지션"
            />
          </div>
          <div className={cn('memo')}>{memo}</div>
          <div className={cn('timeStamp')}>{timeStamp}</div>
        </div>
        <button
          onClick={onOptionBtnClickHandler}
          className={cn('optionBtn')}
          ref={optionBoxRef}
        >
          {(isGuestPost || memberId === user.memberId) && (
            <>
              <BsThreeDots />
              <span className="visuallyHidden">옵션 박스 열거 버튼</span>
            </>
          )}
        </button>
        <div className={cn('optionBox', { open: isOptionOpen })}>
          <button onClick={onPostModifyBtnClickHandler}>수정</button>
          <button onClick={onPostDeleteBtnClickHandler}>삭제</button>
        </div>
      </div>
    </>
  );
}
