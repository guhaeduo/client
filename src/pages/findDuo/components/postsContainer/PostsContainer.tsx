import { PostContent } from 'types/post';
import styles from './postsContainer.module.scss';
import classNames from 'classnames/bind';
import PostItem from './PostItem';

const cn = classNames.bind(styles);

type Props = {
  postsData: PostContent[];
};

export default function PostsContainer({ postsData }: Props) {
  return (
    <div className={cn('postsContainer')}>
      <div className={cn('postsHeader')}>
        <div>
          <div>소환사 이름</div>
          <div>선호 게임</div>
          <div>솔랭 티어</div>
          <div>자랭 티어</div>
          <div>주 포지션</div>
          <div>선호 챔피언</div>
          <div>찾는 포지션</div>
          <div>메모</div>
          <div>등록일시</div>
        </div>
        <div className={cn('optionBtn')}></div>
      </div>
      <div className={cn('postsWrapper')}>
        {postsData.map((post) => (
          <PostItem key={post.postId} post={post} />
        ))}
      </div>
    </div>
  );
}
