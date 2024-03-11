import React, { useState } from 'react';
import styles from './postModal.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { RiotAccount, selectUser } from 'store/userSlice';
import Input from 'components/input/Input';
import DropDown from 'components/dropDown/DropDown';
import Toggle from 'components/toggle/Toggle';
import LaneSelector from 'components/laneSelector/LaneSelector';
import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { useForm } from 'react-hook-form';
import { QUEUE, CHAMPION } from 'constants/options';
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
    riotAccount: RiotAccount[];
  };
};

export default function PostModal({ postData }: Props) {
  const user = useSelector(selectUser);
  const { isLogin, riotAccountList } = user;

  const [isRiotAccountOpen, setIsRiotAccountOpen] = useState(false);
  const [isQueueTypeOpen, setIsQueueTypeOpen] = useState(false);
  const [isMainChampionOpen, setIsMainChampionOpen] = useState(false);
  const [isSubChampionOpen, setIsSubChampionOpen] = useState(false);
  const riotAccountOptions = riotAccountList?.map((account) => ({
    key: account.name + account.tag,
    display: `${account.name}#${account.tag}`,
  }));
  const championOptions = CHAMPION();
  const { register } = useForm();

  const [riotAccount, setRiotAccount] = useSignularOptionSelector({
    defaultOption: postData
      ? `${postData.summonerName}${postData.summonerTag}`
      : riotAccountOptions
        ? riotAccountOptions[0].key
        : '',
  });

  const [mostLane, setMostLane] = useSignularOptionSelector({
    defaultOption: postData?.mainLane || 'ALL',
  });
  const [subLane, setSubLane] = useSignularOptionSelector({
    defaultOption: postData?.subLane || 'ALL',
  });
  const [selectLane, setSelectLane] = useSignularOptionSelector({
    defaultOption: postData?.selectLane || 'ALL',
  });
  const [queueType, setQueueType] = useSignularOptionSelector({
    defaultOption: postData?.queueType || 'ALL',
  });
  const [mainChampion, setMainChampion] = useSignularOptionSelector({
    defaultOption: postData?.mainChampion || championOptions[0].key,
  });
  const [subChampion, setSubChampion] = useSignularOptionSelector({
    defaultOption: postData?.subChampion || championOptions[0].key,
  });

  const [isMicOn, setIsMicOn] = useState(postData?.isMicOn || false);
  return (
    <div className={cn('postModal')}>
      <div>
        <div>
          {' '}
          {riotAccountOptions ? (
            <DropDown
              options={riotAccountOptions}
              currentOptionKey={riotAccount}
              onChange={setRiotAccount}
              type="dark"
              isOpen={isRiotAccountOpen}
              setIsOpen={setIsRiotAccountOpen}
            />
          ) : (
            <Input
              type="text"
              label="소환사 이름"
              {...register('riotAccount')}
            />
          )}{' '}
        </div>
        <div>
          <Toggle
            label="마이크 사용"
            isChecked={isMicOn}
            setIsChecked={setIsMicOn}
          />
        </div>
      </div>
      <div>
        <div>
          <LaneSelector size={20} option={mostLane} onChange={setMostLane} />
        </div>
        <div>
          <DropDown
            options={QUEUE}
            type="dark"
            currentOptionKey={queueType}
            onChange={setQueueType}
            isOpen={isQueueTypeOpen}
            setIsOpen={setIsQueueTypeOpen}
          />
        </div>
      </div>
      <div>
        <div>
          <LaneSelector size={20} option={subLane} onChange={setSubLane} />
        </div>
        <div>
          <DropDown
            options={championOptions}
            currentOptionKey={mainChampion}
            onChange={setMainChampion}
            type="dark"
            isOpen={isMainChampionOpen}
            setIsOpen={setIsMainChampionOpen}
          />
        </div>
      </div>
      <div>
        <div>
          <LaneSelector
            size={20}
            option={selectLane}
            onChange={setSelectLane}
          />
        </div>
        <div>
          <DropDown
            options={championOptions}
            currentOptionKey={subChampion}
            onChange={setSubChampion}
            type="dark"
            isOpen={isSubChampionOpen}
            setIsOpen={setIsSubChampionOpen}
          />
        </div>
      </div>
      <div>
        <Input type="text" label="메모" {...register('memo')} />
      </div>
      <p></p>
      <div className={cn('buttons')}>
        <button>취소</button>
        <button>등록</button>
      </div>
    </div>
  );
}
