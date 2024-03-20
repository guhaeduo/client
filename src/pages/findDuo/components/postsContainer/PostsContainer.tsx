import { PostContent } from 'types/post';
import styles from './postsContainer.module.scss';
import classNames from 'classnames/bind';
import URL from 'constants/url';
import Toast from 'utils/toast';
import ChampionIcon from 'components/championIcon/ChampionIcon';
import { QUEUE } from 'constants/options';
const cn = classNames.bind(styles);

type Props = {
  postData: PostContent[];
};

export default function PostsContainer({ postData }: Props) {
  const onCopyHandler = (name: string, tag: string) => {
    const content = `${name}#${tag}`;
    navigator.clipboard.writeText(content);
    Toast.success('클립보드에 복사되었습니다.', { toastId: content });
  };

  return (
    <div className={cn('postsContainer')}>
      <div className={cn('postsHeader')}>
        <div>소환사 이름</div>
        <div>선호 게임</div>
        <div>솔랭 티어</div>
        <div>자랭 티어</div>
        <div>메인 포지션</div>
        <div>메인 챔피언</div>
        <div>찾는 포지션</div>
        <div>메모</div>
        <div>등록일시</div>
        <div></div>
      </div>
      <div className={cn('postsWrapper')}>
        {postData.map((post) => (
          <div key={post.postId} className={cn('postItem')}>
            <div className={cn('summonerInfo')}>
              <div className={cn('summonerIcon')}>
                <img src={URL.profileIcon(1)} alt="소환사 프로필 아이콘" />
              </div>
              <div className={cn('summonerNameTag')}>
                <span className={cn('name')}>{post.riotGameName}</span>
                <div className={cn('tag')}>
                  <span>#{post.riotGameTag}</span>
                  <button
                    className={cn('copy')}
                    onClick={() =>
                      onCopyHandler(post.riotGameName, post.riotGameTag)
                    }
                  >
                    복사
                  </button>
                </div>
              </div>
            </div>
            <div>
              {QUEUE.find((queue) => queue.key === post.needQueueType)?.display}
            </div>
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
                src={URL.laneIcon(post.mainLane)}
                className={cn('lane')}
                alt="메인 포지션"
              />
            </div>
            <ChampionIcon
              className={cn('champion')}
              championName={post.mainChampion}
            />
            <div>
              <img
                src={URL.laneIcon(post.needPosition)}
                className={cn('lane')}
                alt="찾는 포지션"
              />
            </div>
            <div className={cn('memo')}>{post.memo}</div>
            <div>3분전</div>
            <button>...</button>
          </div>
        ))}
      </div>
    </div>
  );
}
