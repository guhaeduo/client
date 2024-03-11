import React, { useState } from 'react';
import styles from './postModal.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import Input from 'components/input/Input';
import DropDown from 'components/dropDown/DropDown';
import Toggle from 'components/toggle/Toggle';
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
    isMicOn: boolean;
    queueType: string;
    mainChampion: string;
    subChampion: string;
    memo: string;
  };
};

export default function PostModal({ postData }: Props) {
  const user = useSelector(selectUser);
  const { isLogin } = user;

  const [isMicOn, setIsMicOn] = useState(postData?.isMicOn || false);
  return (
    <div>
      <div></div>
      <div>
        <Toggle
          label="마이크 사용"
          isChecked={isMicOn}
          setIsChecked={setIsMicOn}
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
