import styles from './postsContainer.module.scss';
import classNames from 'classnames/bind';
import URL from 'constants/url';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import { QUEUE } from 'constants/options';
import { BsThreeDots } from 'react-icons/bs';
import Modal from 'components/modal/Modal';
import PostWriteModal from '../postWriteModal/PostWriteModal';
import PostModal from '../postModal/PostModal';
import PostDeleteModal from '../postDeleteModal/PostDeleteModal';
import { PostContent } from 'types/post';
import clipBoardCopy from 'utils/clipBoardCopy';
import { MouseEventHandler, useRef, useState } from 'react';
import useHandleOutsideClick from 'hooks/useHandleOustsideClick';
import { calculateTimeStamp } from 'utils/calculate';
import { IoMic } from 'react-icons/io5';
import { SiRiotgames } from 'react-icons/si';
const cn = classNames.bind(styles);

type Props = {
  post: PostContent;
};

export default function PostItem({ post }: Props) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isPostModifyModalOpen, setIsPostModifyModalOpen] = useState(false);
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  const optionBoxRef = useRef(null);

  const gameType = QUEUE.find((queue) => queue.key === post.queueType)
    ?.display as string;
  const onOptionBtnClickHandler = () => {
    setIsOptionOpen((prevOpen) => !prevOpen);
  };

  const onCopyHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    clipBoardCopy(`${post.riotGameName}#${post.riotGameTag}`);
  };

  const onPostItemClickHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPostModalOpen(true);
  };

  const onPostModifyBtnClickHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPostModifyModalOpen(true);
    setIsOptionOpen(false);
  };

  const onPostDeleteBtnClickHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsPostDeleteModalOpen(true);
    setIsOptionOpen(false);
  };

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
        <PostWriteModal setIsOpen={setIsPostModifyModalOpen} postData={post} />
      </Modal>
      <Modal isOpen={isPostModalOpen} setIsOpen={setIsPostModalOpen}>
        <PostModal
          gameType={gameType}
          setIsOpen={setIsPostModalOpen}
          postData={post}
        />
      </Modal>
      <Modal
        isOpen={isPostDeleteModalOpen}
        setIsOpen={setIsPostDeleteModalOpen}
      >
        <PostDeleteModal setIsOpen={setIsPostDeleteModalOpen} postData={post} />
      </Modal>
      <div key={post.postId} className={cn('postItem')}>
        <div onClick={onPostItemClickHandler} className={cn('postDataWrapper')}>
          <div className={cn('summonerInfo')}>
            <div className={cn('summonerIcon')}>
              <img
                src={URL.profileIcon(post.summonerIconNumber)}
                alt="소환사 프로필 아이콘"
              />
            </div>
            <div className={cn('basicData')}>
              <span className={cn('name')}>{post.riotGameName}</span>
              <div className={cn('tag')}>
                <span>#{post.riotGameTag}</span>
                <button className={cn('copy')} onClick={onCopyHandler}>
                  복사
                </button>
                {post.isMicOn && <IoMic className={cn('mic')} />}
                {post.isRiotVerified && (
                  <div className={cn('riotBadge')}>
                    <SiRiotgames />
                  </div>
                )}
              </div>{' '}
            </div>
          </div>
          <div className={cn('gameType')}>{gameType}</div>
          <div>
            <img
              className={cn('tier')}
              src={URL.tierIcon(post.soloRankTier)}
              alt="솔랭 티어"
            />
          </div>
          <div>
            <img
              className={cn('tier')}
              src={URL.tierIcon(post.freeRankTier)}
              alt="자랭 티어"
            />
          </div>{' '}
          <div>
            <img
              src={URL.laneIcon(post.myMainLane)}
              className={cn('lane')}
              alt="메인 포지션"
            />
          </div>
          <ChampionIcon
            className={cn('champion')}
            championName={post.myMainChampionName}
          />
          <div>
            <img
              src={URL.laneIcon(post.needPosition)}
              className={cn('lane')}
              alt="찾는 포지션"
            />
          </div>
          <div className={cn('memo')}>{post.memo}</div>
          <div>{calculateTimeStamp(post.createdAt)}</div>
        </div>
        <button
          onClick={onOptionBtnClickHandler}
          className={cn('optionBtn')}
          ref={optionBoxRef}
        >
          <BsThreeDots />
          <span className="visuallyHidden">옵션 박스 열거 버튼</span>
          <div className={cn('optionBox', { open: isOptionOpen })}>
            <button onClick={onPostModifyBtnClickHandler}>수정</button>
            <button onClick={onPostDeleteBtnClickHandler}>삭제</button>
          </div>
        </button>
      </div>
    </>
  );
}
