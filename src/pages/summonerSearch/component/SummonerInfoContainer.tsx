import React, { useState } from 'react';
import styles from './summonerInfoContainer.module.scss';
import classNames from 'classnames/bind';
import { SummonerInfo, SummonerRankInfo } from 'types/summoner';
import DDRAGON_URL from 'constants/ddragonUrl';
import calculateWinRate from 'utils/calculateWinRate';
const cn = classNames.bind(styles);

type Props = {
  summonerInfo: SummonerInfo;
};

type RankType = 'soloRank' | 'freeRank';

export default function SummonerInfoContainer({ summonerInfo }: Props) {
  const [rankType, setRankType] = useState<RankType>('soloRank');
  // const winningRate = calculateWinRate(rankData.win, rankData.lose);
  const { gameName, tagLine, profileIconId } = summonerInfo;

  // useEffect(() => {
  //   const updateSummonerInfo = async () => {
  //     try {
  //       setIsFirstLoading(true);
  //       const summonerInfo = await getSummonerInfo(name, tag, country);
  //       setSummonerInfo(summonerInfo);
  //       if (!summonerInfo) return;
  //       const summonerRankInfo = await getSummonerRankInfo(
  //         summonerInfo.id,
  //         summonerInfo.region,
  //       );
  //       setSummonerRankInfo(summonerRankInfo);
  //       setIsFirstLoading(false);
  //     } catch (err) {
  //       setIsFirstLoading(false);
  //       if (axios.isAxiosError<RiotAPIErrorResponse>(err) && err.response) {
  //         const { status } = err.response.data;
  //         const errorMessage = RIOT_API_ERROR_MESSAGE[status.status_code];
  //         setErrorMessage(errorMessage);
  //       }
  //     }
  //   };
  //   updateSummonerInfo();
  // }, []);
  return (
    <div className={cn('summonerInfo')}>
      <div className={cn('summonerIcon')}>
        <img
          src={DDRAGON_URL.profileIcon(profileIconId)}
          alt="summonerProfileIcon"
        />
      </div>
      <div className={cn('summonerNameTag')}>
        <span className={cn('summonerName')}>{gameName}</span>
        <span className={cn('summonerTag')}>#{tagLine}</span>
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
        {/* <div className={cn('rankDataContainer')}>
          <div className={cn('rankTierIcon')}>
            <img src={DDRAGON_URL.tierIcon(rankData.tier)} alt="summonerTier" />
          </div>
          <div className={cn('rankWrapper')}>
            <p className={cn('rankTier')}>
              <span>{rankData.tier}</span>
              {rankData.level !== 0 && <span>{rankData.level}</span>}
            </p>
            <span className={cn('rankPoint')}>{rankData.point} LP</span>
            <p className={cn('winningWrapper')}>
              <span>승률 {winningRate}</span>
              <span>
                ({rankData.win}승 {rankData.lose}패)
              </span>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
