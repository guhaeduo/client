import 'chart.js/auto';
import {
  Lane,
  SummonerGameSummary,
  SummaryQueueType,
  SummaryChampionStats,
} from 'types/summoner';
import classNames from 'classnames/bind';
import { Doughnut } from 'react-chartjs-2';
import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import LaneSelector from 'components/common/laneSelector/LaneSelector';
import { useEffect, useState } from 'react';
import URL from 'constants/url';
import { useLocation } from 'react-router-dom';
import ChampionTag from './ChampionTag';
import QueueTypeTab from '../components/QueueTypeTab';
import styles from './summonerGameSummaryContainer.module.scss';

const cn = classNames.bind(styles);

export const SUMMARY_TAB_MENUS: {
  value: SummaryQueueType;
  display: string;
}[] = [
  { value: 'ALL', display: '모든 큐' },
  { value: 'SOLO', display: '솔로랭크' },
  { value: 'FREE', display: '자유랭크' },
];

type Props = {
  summonerGameSummary: SummonerGameSummary;
  summaryQueueType: SummaryQueueType;
  setSummaryQueueType: React.Dispatch<React.SetStateAction<SummaryQueueType>>;
};

export default function SummonerGameSummaryContainer({
  summonerGameSummary,
  summaryQueueType,
  setSummaryQueueType,
}: Props) {
  const { info, lane } = summonerGameSummary;
  const [summaryLaneOption, setSummaryLaneOption] = useSignularOptionSelector({
    defaultOption: 'ALL',
  });
  const { pathname } = useLocation();
  const detailsLane = summaryLaneOption as Lane;
  const detailData = lane[detailsLane];
  const laneKey = Object.keys(lane) as Lane[];
  const disableLane = laneKey.filter(
    (key) => lane[key].mostChampionlist.length <= 0,
  );
  const [currentDetailChampion, setCurrentDetailChampion] =
    useState<SummaryChampionStats | null>(
      disableLane.includes(detailsLane) ? null : detailData.mostChampionlist[0],
    );

  useEffect(() => {
    setSummaryLaneOption('ALL');
    setCurrentDetailChampion(detailData.mostChampionlist[0]);
  }, [pathname, summaryQueueType]);

  useEffect(() => {
    setCurrentDetailChampion(detailData.mostChampionlist[0]);
  }, [summaryLaneOption]);

  const infoWinningRateData = {
    labels: [],
    datasets: [
      {
        data: [
          parseInt(info.winningRate, 10),
          100 - parseInt(info.winningRate, 10),
        ],
        backgroundColor: ['#4c97ff', '#2f2f2f'],
        borderColor: ['transparent'],
        cutout: '70%',
      },
    ],
  };

  const gameCntChartData = (data: number[]) => {
    const isAllZero = data.every((value) => value === 0);
    return isAllZero ? [1] : data;
  };

  const gameCntChartColor = (selectLane: Lane) =>
    detailsLane === selectLane || detailsLane === 'ALL' ? '#4c97ff' : '#2f2f2f';

  const detailGameCntData = {
    labels: [],
    datasets: [
      {
        data: gameCntChartData([
          lane.TOP.cntGame,
          lane.JUG.cntGame,
          lane.MID.cntGame,
          lane.ADC.cntGame,
          lane.SUP.cntGame,
        ]),
        backgroundColor: [
          gameCntChartColor('TOP'),
          gameCntChartColor('JUG'),
          gameCntChartColor('MID'),
          gameCntChartColor('ADC'),
          gameCntChartColor('SUP'),
        ],
        borderColor: ['transparent'],
        cutout: '70%',
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      hover: { mode: null },
    },
  };

  const renderInfoLaneImage = (selectLane: string) =>
    selectLane ? (
      <img src={URL.laneIcon(selectLane)} alt="선호 라인" />
    ) : (
      <span>데이터 없음</span>
    );

  return (
    <div className={cn('summaryContainer')}>
      <QueueTypeTab
        queueType={summaryQueueType}
        tabMenus={SUMMARY_TAB_MENUS}
        setQueueType={setSummaryQueueType}
      />
      <div className={cn('summary')}>
        <div className={cn('informationContainer')}>
          <div className={cn('summaryTitle')}>정보</div>
          <div className={cn('infomations')}>
            <div className={cn('winningRateChartContainer', 'chart')}>
              <Doughnut data={infoWinningRateData} options={options} />
              <div className={cn('chartDetail')}>
                <span className={cn('infoWinningRate')}>
                  {info.winningRate}
                </span>
                <div>
                  <span className={cn('infoWins')}>{info.wins}승</span>
                  <span className={cn('infoLoses')}>{info.loses}패</span>
                </div>
              </div>
            </div>
            <div className={cn('infoDivider')}></div>
            <div className={cn('infoDataContainer')}>
              <div>
                <span className={cn('infoKDA')}>KDA {info.kda}</span>
                <div className={cn('infoKDS')}>
                  <span>{info.killAvg} /</span>
                  <span className={cn('infoDeathAvg')}> {info.deathAvg} </span>
                  <span>/ {info.assistAvg}</span>
                </div>
              </div>
              <div className={cn('infoLane')}>
                <div>
                  {renderInfoLaneImage(info.mainLane)}
                  <span>모스트 라인</span>
                </div>
                <div>
                  {renderInfoLaneImage(info.subLane)}
                  <span>서브 라인</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('detailsContainer')}>
          <div className={cn('summaryTitle')}>
            라인별 상세정보 / 모스트 챔피언
          </div>
          <div className={cn('details')}>
            <LaneSelector
              option={summaryLaneOption}
              onChange={setSummaryLaneOption}
              size={30}
              disableLane={disableLane}
            />
            {disableLane.includes(detailsLane) ? (
              <div className={cn('detailDataNotFound')}>
                데이터가 존재하지 않습니다.
              </div>
            ) : (
              <>
                <div className={cn('detailWrapper')}>
                  <div className={cn('detailsTop')}>
                    <div className={cn('mostChampions')}>
                      {currentDetailChampion &&
                        detailData.mostChampionlist.map((champion) => (
                          <ChampionTag
                            currentDetailChampion={currentDetailChampion}
                            setCurrentDetailChampion={setCurrentDetailChampion}
                            key={champion.championName}
                            champion={champion}
                          />
                        ))}
                    </div>
                    <div className={cn('detailGameCntChartContainer', 'chart')}>
                      <Doughnut
                        data={detailGameCntData}
                        options={{
                          ...options,
                          aspectRatio: 0.1,
                        }}
                        width={400}
                        height={200}
                      />
                      <div className={cn('chartDetail')}>
                        <span>{summaryLaneOption}</span>
                        <span>{detailData.cntGame} 게임</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn('detailData')}>
                    <div>
                      <span>{currentDetailChampion?.csPerMinute}</span>
                      <span>분당 CS</span>
                    </div>
                    <div>
                      <span>{currentDetailChampion?.kda}</span>
                      <span>시야 점수</span>
                    </div>
                    <div>
                      <span>{currentDetailChampion?.winningRate}</span>
                      <span>승률</span>
                    </div>
                    <div>
                      <span>{currentDetailChampion?.killParticipation}</span>
                      <span>킬 관여율</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
