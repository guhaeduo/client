import Skeleton from 'components/skeleton/Skeleton';
import styles from '../postsContainer/postsContainer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function PostsContainerSkeleton() {
  return (
    <div className={cn('postsWrapper')}>
      {[...Array(20)].map((_, i) => (
        <Skeleton key={i} className={cn('postItem')} />
      ))}
    </div>
  );
}
