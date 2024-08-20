import React from 'react';
import { PostContent } from 'types/post';
import classNames from 'classnames/bind';
import { IoMic } from 'react-icons/io5';
import { SiRiotgames } from 'react-icons/si';
import clipBoardCopy from 'utils/clipBoardCopy';
import URL from 'constants/url';
import ChampionIcon from 'components/common/championIcon/ChampionIcon';
import styles from './postModal.module.scss';

const cn = classNames.bind(styles);

type Props = {
  postData: PostContent;
  gameType: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * 듀오 게시글 조회 모달 입니다.
 * @param {PostContent} postData - 게시글 데이터
 * @param {string} - gameType - 게시글의 한글 게임 타입
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - 게시글 조회 모달 오픈 여부 핸들러
 */

export default function PostModal({ postData, gameType, setIsOpen }: Props) {
  const {
    riotGameName,
    riotGameTag,
    isMicOn,
    isRiotVerified,
    freeRankTier,
    soloRankTier,
    freeRankLevel,
    soloRankLevel,
    myMainLane,
    myMainChampionName,
    mySubLane,
    mySubChampionName,
    needPosition,
    summonerIconNumber,
    memo,
  } = postData;

  return (
    <div className={cn('postModal')}>
      <div className={cn('basicData')}>
        <div>
          <img
            src={URL.profileIcon(summonerIconNumber)}
            alt="소환사 프로필 아이콘"
          />
        </div>
        <div>
          <div>
            <span>{riotGameName}</span>
            <div>
              {isMicOn && <IoMic className={cn('mic')} />}
              {isRiotVerified && (
                <div className={cn('riotBadge')}>
                  <SiRiotgames />
                </div>
              )}
            </div>
          </div>
          <div>
            <span className={cn('tag')}>#{riotGameTag}</span>
            <button
              onClick={() => clipBoardCopy(`${riotGameName}#${riotGameTag}`)}
              className={cn('copy')}
            >
              복사
            </button>
          </div>
        </div>
      </div>
      <div className={cn('tier', 'wrapper')}>
        <div>
          <span>솔로랭크 티어</span>
          <div>
            <img src={URL.tierIcon(soloRankTier)} alt="솔로랭크 티어 아이콘" />
            <span>
              {soloRankTier} {soloRankLevel}
            </span>
          </div>
        </div>
        <div>
          <span>자유랭크 티어</span>
          <div>
            <img src={URL.tierIcon(freeRankTier)} alt="자유랭크 티어 아이콘" />
            <span>
              {freeRankTier} {freeRankLevel}
            </span>
          </div>
        </div>
      </div>
      <div className={cn('position', 'wrapper')}>
        <div>
          <span>주 역할군 / 주 챔피언</span>
          <div>
            <img src={URL.laneIcon(myMainLane)} alt="주 라인" />
            <ChampionIcon
              championName={myMainChampionName}
              className={cn('champion')}
            />
          </div>
        </div>
        <div>
          <span>서브 역할군 / 서브 챔피언</span>
          <div>
            <img src={URL.laneIcon(mySubLane)} alt="부 라인" />
            <ChampionIcon
              championName={mySubChampionName}
              className={cn('champion')}
            />
          </div>
        </div>
      </div>
      <div className={cn('select', 'wrapper')}>
        <div>
          <span>선호 게임</span>
          <span className={cn('queueType')}>{gameType}</span>
        </div>
        <div>
          <span>찾는 포지션</span>
          <img src={URL.laneIcon(needPosition)} alt="찾는 라인" />
        </div>
      </div>
      {memo && (
        <div className={cn('memo')}>
          <span>메모</span>
          <div className={cn('memoContent')}>{memo}</div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className={cn('cancelBtn', 'closeBtn')}
      >
        닫기
      </button>
    </div>
  );
}
