import Skeleton from 'components/common/skeleton/Skeleton';
import classNames from 'classnames/bind';
import styles from '../postsContainer/postsContainer.module.scss';

const cn = classNames.bind(styles);

export default function PostsContainerSkeleton() {
  return (
    <div className={cn('postsWrapper')}>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className={cn('postItem')} />
      ))}
    </div>
  );
}
