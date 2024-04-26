import { PostContent } from 'types/post';
import classNames from 'classnames/bind';
import styles from './postsContainer.module.scss';
import PostItem from './PostItem';
import PostsContainerSkeleton from '../skeleton/PostsContainerSkeleton';

const cn = classNames.bind(styles);

type Props = {
  postsData: PostContent[];
  isFetchingNextPage: boolean;
  setQueueOption: (queueOption: string) => void;
  onQueryClearHandler: () => void;
};

export default function PostsContainer({
  postsData,
  isFetchingNextPage,
  setQueueOption,
  onQueryClearHandler,
}: Props) {
  return (
    <div className={cn('postsContainer')}>
      <div className={cn('postsHeader')}>
        <div>
          <div>소환사 이름</div>
          <div>선호 게임</div>
          <div>티어</div>
          <div>주 포지션</div>
          <div>선호 챔피언</div>
          <div>찾는 포지션</div>
          <div>메모</div>
          <div>등록일시</div>
        </div>
        <div className={cn('optionBtn')}></div>
      </div>
      <div className={cn('postsWrapper')}>
        {postsData.map((postData) => (
          <PostItem
            setQueueOption={setQueueOption}
            onQueryClearHandler={onQueryClearHandler}
            key={postData.postId}
            postData={postData}
          />
        ))}
        {isFetchingNextPage && <PostsContainerSkeleton />}
      </div>
    </div>
  );
}
