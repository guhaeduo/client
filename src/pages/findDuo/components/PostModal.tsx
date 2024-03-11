import React from 'react';
import styles from './postModal.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';

const cn = classNames.bind(styles);

type Props = {
  postData?: {
    postId: number;
    memberId: string;
    summonerName: string;
    summonerTag: string;
    mainLane: string;
    subLane: string;
    selectLane: string;
    isMic: boolean;
    queueType: string;
    mainChampion: string;
    subChampion: string;
    memo: string;
  };
};

export default function PostModal({ postData }: Props) {
  const user = useSelector(selectUser);

  return (
    <div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
