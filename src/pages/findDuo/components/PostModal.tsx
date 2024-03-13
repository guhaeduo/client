import { useState } from 'react';
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
import { IoAlertCircleOutline } from 'react-icons/io5';

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
            <>
              <label>게임 계정</label>
              <DropDown
                options={riotAccountOptions}
                currentOptionKey={riotAccount}
                onChange={setRiotAccount}
                type="dark"
                isOpen={isRiotAccountOpen}
                setIsOpen={setIsRiotAccountOpen}
                className={cn('dropDown')}
              />
            </>
          ) : (
            <Input
              type="text"
              label="소환사 이름"
              {...register('riotAccount')}
            />
          )}
        </div>
        <div>
          <label>마이크 사용</label>
          <Toggle isChecked={isMicOn} setIsChecked={setIsMicOn} />
        </div>
      </div>
      <div>
        <div>
          <label>선호 라인</label>
          <LaneSelector size={28} option={mostLane} onChange={setMostLane} />
        </div>
        <div>
          <label>게임 타입</label>
          <DropDown
            options={QUEUE}
            type="dark"
            currentOptionKey={queueType}
            onChange={setQueueType}
            isOpen={isQueueTypeOpen}
            setIsOpen={setIsQueueTypeOpen}
            className={cn('dropDown')}
          />
        </div>
      </div>
      <div>
        <div>
          <label>서브 라인</label>
          <LaneSelector size={28} option={subLane} onChange={setSubLane} />
        </div>
        <div>
          <label>메인 챔피언</label>
          <DropDown
            options={championOptions}
            currentOptionKey={mainChampion}
            onChange={setMainChampion}
            type="dark"
            isOpen={isMainChampionOpen}
            setIsOpen={setIsMainChampionOpen}
            className={cn('dropDown')}
          />
        </div>
      </div>
      <div>
        <div>
          <label>찾는 라인</label>
          <LaneSelector
            size={28}
            option={selectLane}
            onChange={setSelectLane}
          />
        </div>
        <div>
          <label>서브 챔피언</label>
          <DropDown
            options={championOptions}
            currentOptionKey={subChampion}
            onChange={setSubChampion}
            type="dark"
            isOpen={isSubChampionOpen}
            setIsOpen={setIsSubChampionOpen}
            className={cn('dropDown')}
          />
        </div>
      </div>
      <div>
        <Input
          type="text"
          label="메모"
          maxLength={100}
          {...register('memo')}
          className={cn('memo')}
        />
      </div>
      <div className={cn('footer')}>
        <p>
          <IoAlertCircleOutline />
          타인에 대한 모욕, 명예훼손, 성희롱 등의 행위는 법적 처벌을 받을 수
          있습니다.
        </p>
        <div className={cn('buttons')}>
          {' '}
          <button>취소</button>
          <button>등록</button>
        </div>
      </div>
    </div>
  );
}
