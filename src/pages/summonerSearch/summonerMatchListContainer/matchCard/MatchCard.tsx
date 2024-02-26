import { MatchData } from 'types/summoner';
import { useState } from 'react';
import styles from './matchCard.module.scss';
import classNames from 'classnames/bind';
import CurrentSummonerMatchCard from './CurrentSummonerMatchCard';
import ParticipantMatchCard from './ParticipantMatchCard';

const cn = classNames.bind(styles);

type Props = {
  matchData: MatchData;
};

export default function MatchCard({ matchData }: Props) {
  const { currentSummonerMatchData, info } = matchData;
  const [isOpen, setIsOpen] = useState(false);
  const cardOpenHandler = () => setIsOpen(!isOpen);

  return (
    <li
      className={cn('matchCard', {
        quickShutDown: info.quickShutdown,
        win: currentSummonerMatchData.win,
        lose: !currentSummonerMatchData.win,
      })}
    >
      <CurrentSummonerMatchCard
        matchData={matchData}
        cardOpenHandler={cardOpenHandler}
        isOpen={isOpen}
      />
      {isOpen && <ParticipantMatchCard matchData={matchData} />}
    </li>
  );
}
