import styles from '../summonerInfoContainer/summonerInfoContainer.module.scss';
import classNames from 'classnames/bind';
import Skeleton from 'components/common/skeleton/Skeleton';
const cn = classNames.bind(styles);

export default function SummonerInfoContainerSkeleton() {
  return (
    <div className={cn('summonerInfo', 'skeleton')}>
      <div>
        <Skeleton className={cn('summonerIcon')} />
        <Skeleton className={cn('summonerNameTag')} />
      </div>
      <div className={cn('rankTierContainer')}>
        <Skeleton className={cn('rankTypeSelectWrapper')} />
        <div className={cn('rankDataContainer')}>
          <Skeleton className={cn('rankTierIcon')} />
          <Skeleton className={cn('rankWrapper')} />
        </div>
      </div>
      <div className={cn('rankTierContainerSpread')}>
        <div>
          <div className={cn('title')}>솔로랭크</div>
          <div className={cn('rankDataContainer')}>
            <Skeleton className={cn('rankTierIcon')} />
            <Skeleton className={cn('rankWrapper')} />
          </div>
        </div>
        <div>
          <div className={cn('title')}>자유랭크</div>
          <div className={cn('rankDataContainer')}>
            <Skeleton className={cn('rankTierIcon')} />
            <Skeleton className={cn('rankWrapper')} />
          </div>
        </div>
      </div>
    </div>
  );
}
