import { useState } from 'react';
import styles from './summonerInfoContainer.module.scss';
import classNames from 'classnames/bind';
import { SummonerInfo, SummonerRankInfo } from 'types/summoner';
import URL from 'constants/url';
import { calculateWinRate } from 'utils/calculate';
import { RankData } from 'types/summoner';
const cn = classNames.bind(styles);

type Props = {
  summonerInfo: SummonerInfo;
  summonerRankInfo: SummonerRankInfo;
};

type RankType = 'soloRank' | 'freeRank';

export default function SummonerInfoContainer({
  summonerInfo,
  summonerRankInfo,
}: Props) {
  const [rankType, setRankType] = useState<RankType>('soloRank');
  const { gameName, tagLine, profileIconId } = summonerInfo;

  const renderRankTierContainer = (rankData: RankData) => (
    <div className={cn('rankDataContainer')}>
      <div className={cn('rankTierIcon')}>
        <img src={URL.tierIcon(rankData.tier)} alt="summonerTier" />
      </div>
      <div className={cn('rankWrapper')}>
        <p className={cn('rankTier')}>
          <span>{rankData.tier}</span>
          {rankData.level !== 0 && <span>{rankData.level}</span>}
        </p>
        <span className={cn('rankPoint')}>{rankData.point} LP</span>
        <p className={cn('winningWrapper')}>
          <span>승률 {calculateWinRate(rankData.win, rankData.lose)}</span>
          <span>
            ({rankData.win}승 {rankData.lose}패)
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className={cn('summonerInfo')}>
        <div>
          <div className={cn('summonerIcon')}>
            <img
              src={URL.profileIcon(profileIconId)}
              alt="summonerProfileIcon"
            />
          </div>
          <div className={cn('summonerNameTag')}>
            <span className={cn('summonerName')}>{gameName}</span>
            <span className={cn('summonerTag')}>#{tagLine}</span>
          </div>
        </div>
        <div className={cn('rankTierContainer')}>
          <div className={cn('rankTypeSelectWrapper')}>
            <span
              onClick={() => setRankType('soloRank')}
              className={cn('rankTypeSelector', {
                active: rankType === 'soloRank',
              })}
            >
              솔로랭크
            </span>
            <div className={cn('divider')}></div>
            <span
              onClick={() => setRankType('freeRank')}
              className={cn('rankTypeSelector', {
                active: rankType === 'freeRank',
              })}
            >
              자유랭크
            </span>
          </div>
          {renderRankTierContainer(summonerRankInfo[rankType])}
        </div>
        <div className={cn('rankTierContainerSpread')}>
          <div>
            <div className={cn('title')}>솔로랭크</div>
            {renderRankTierContainer(summonerRankInfo.soloRank)}
          </div>
          <div>
            <div className={cn('title')}>자유랭크</div>
            {renderRankTierContainer(summonerRankInfo.freeRank)}
          </div>
        </div>
      </div>
    </>
  );
}
