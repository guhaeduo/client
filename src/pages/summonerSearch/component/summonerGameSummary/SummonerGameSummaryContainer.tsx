import 'chart.js/auto';
import styles from './summonerGameSummaryContainer.module.scss';
import { Lane, SummonerGameSummary } from 'types/summoner';
import classNames from 'classnames/bind';
import { SummaryQueueType } from 'types/summoner';
import RankSummaryQueueTypeTab from './GameSummaryQueueTypeTab';
import { Doughnut } from 'react-chartjs-2';
import useOptionSelector from 'hooks/useOptionSelector';
import LaneSelector from 'components/laneSelector/LaneSelector';
import { useEffect, useState } from 'react';
import { SummaryChampionStats } from 'types/summoner';
import ChampionTag from './ChampionTag';

const cn = classNames.bind(styles);

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
  const [summaryLaneOption, setSummaryLaneOption] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });
  const currentDetailsLane = summaryLaneOption[0] as Lane;
  const detailsData = lane[currentDetailsLane];
  const laneKey = Object.keys(lane) as Lane[];
  const disableLane = laneKey.filter(
    (key) => lane[key].mostChampionlist.length <= 0,
  );
  const [currentDetailChampion, setCurrentDetailChampion] =
    useState<SummaryChampionStats | null>(
      disableLane.includes(currentDetailsLane)
        ? null
        : detailsData.mostChampionlist[0],
    );

  useEffect(() => {
    setSummaryLaneOption('ALL');
    setCurrentDetailChampion(detailsData.mostChampionlist[0]);
  }, [summaryQueueType]);

  useEffect(() => {
    setCurrentDetailChampion(detailsData.mostChampionlist[0]);
  }, [summaryLaneOption]);

  const data = {
    labels: [],
    datasets: [
      {
        data: [parseInt(info.winningRate), 100 - parseInt(info.winningRate)],
        backgroundColor: ['#4c97ff', '#313131'],
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
    },
  };

  return (
    <div className={cn('summaryContainer')}>
      <RankSummaryQueueTypeTab
        summaryQueueType={summaryQueueType}
        setSummaryQueueType={setSummaryQueueType}
      />
      <div className={cn('summary')}>
        <div className={cn('informationContainer')}>
          <h5>정보</h5>
          <div className={cn('infomations')}>
            <div className={cn('winningRateChartContainer')}>
              <Doughnut
                data={data}
                options={options}
                style={{ width: '250px' }}
              />
              <div>
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
              <span className={cn('infoKDA')}>KDA {info.kda}</span>
              <div className={cn('infoKDS')}>
                <span>{info.killAvg} /</span>
                <span className={cn('infoDeathAvg')}> {info.deathAvg} </span>
                <span>/ {info.assistAvg}</span>
              </div>
              <div className={cn('infoLane')}>
                <div>
                  {info.mostLane ? (
                    <img
                      src={
                        process.env.REACT_APP_PUBLIC_URL +
                        `/images/lane/${info.mostLane}.png`
                      }
                      alt="소환사 모스트 라인"
                    />
                  ) : (
                    <span>데이터 없음</span>
                  )}
                  <h6>모스트 라인</h6>
                </div>
                <div>
                  {info.subLane ? (
                    <img
                      src={
                        process.env.REACT_APP_PUBLIC_URL +
                        `/images/lane/${info.subLane}.png`
                      }
                      alt="소환사 서브 라인"
                    />
                  ) : (
                    <span>데이터 없음</span>
                  )}
                  <h6>서브 라인</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* disableLane.includes(currentDetailsLane) */}
        <div className={cn('detailsContainer')}>
          <h5>라인별 상세정보</h5>
          <div className={cn('details')}>
            <div className={cn('detailsTop')}>
              <div>
                <LaneSelector
                  options={summaryLaneOption}
                  onChange={setSummaryLaneOption}
                  size={30}
                  disableLane={disableLane}
                />
                <div className={cn('mostChampions')}>
                  {currentDetailChampion &&
                    detailsData.mostChampionlist.map((champion) => (
                      <ChampionTag
                        currentDetailChampion={currentDetailChampion}
                        setCurrentDetailChampion={setCurrentDetailChampion}
                        key={champion.championName}
                        champion={champion}
                      />
                    ))}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
