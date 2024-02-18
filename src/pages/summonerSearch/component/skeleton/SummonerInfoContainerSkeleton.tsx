import React from 'react';
import styles from '../summonerInfoContainer/summonerInfoContainer.module.scss';
import classNames from 'classnames/bind';
import Skeleton from 'components/skeleton/Skeleton';
const cn = classNames.bind(styles);

export default function SummonerInfoContainerSkeleton() {
  return (
    <div className={cn('summonerInfo')}>
      <Skeleton className={cn('summonerIcon')} />
      <Skeleton className={cn('summonerNameTag')} />
      <div className={cn('rankTierContainer')}>
        <Skeleton className={cn('rankTypeSelectWrapper')} />
        <div className={cn('rankDataContainer')}>
          <Skeleton className={cn('rankTierIcon')} />
          <Skeleton className={cn('rankWrapper')} />
        </div>
      </div>
    </div>
  );
}
