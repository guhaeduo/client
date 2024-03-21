import styles from './postWriteModal.module.scss';
import classNames from 'classnames/bind';
import Input from 'components/input/Input';
import DropDown from 'components/dropDown/DropDown';
import Toggle from 'components/toggle/Toggle';
import LaneSelector from 'components/laneSelector/LaneSelector';
import { summonerNameTagValidation } from 'utils/validatior';
import { QUEUE } from 'constants/options';
import { IoAlertCircleOutline } from 'react-icons/io5';
import usePostWriteForm from 'hooks/form/usePostWriteForm';
import { PostContent } from 'types/post';
const cn = classNames.bind(styles);

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postData?: PostContent;
};

export default function PostWriteModal({ postData, setIsOpen }: Props) {
  const {
    isLogin,
    isRiotAccountOpen,
    setIsRiotAccountOpen,
    isQueueTypeOpen,
    setIsQueueTypeOpen,
    isMainChampionOpen,
    setIsMainChampionOpen,
    isSubChampionOpen,
    setIsSubChampionOpen,
    register,
    riotAccount,
    setRiotAccount,
    mostLane,
    setMostLane,
    subLane,
    setSubLane,
    selectLane,
    setSelectLane,
    queueType,
    setQueueType,
    mainChampion,
    setMainChampion,
    subChampion,
    setSubChampion,
    isMicOn,
    setIsMicOn,
    riotAccountOptions,
    championOptions,
    submitHandler,
    errors,
  } = usePostWriteForm({ postData, setIsOpen });

  return (
    <div className={cn('postModal')}>
      <div>
        <div>
          {riotAccountOptions?.length ? (
            <>
              <label>게임 계정</label>
              <DropDown
                label="게임 계정 선택 메뉴"
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
              label="소환사 이름#태그"
              error={errors.summonerName}
              className={cn('summonerNameInput')}
              {...register('summonerName', summonerNameTagValidation)}
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
          <LaneSelector size={27} option={mostLane} onChange={setMostLane} />
        </div>
        <div>
          <label>게임 타입</label>
          <DropDown
            label="게임 타입 선택 메뉴"
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
          <LaneSelector size={27} option={subLane} onChange={setSubLane} />
        </div>
        <div>
          <label>메인 챔피언</label>
          <DropDown
            label="메인 챔피언 선택 메뉴"
            options={championOptions}
            currentOptionKey={mainChampion.toLowerCase()}
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
            size={27}
            option={selectLane}
            onChange={setSelectLane}
          />
        </div>
        <div>
          <label>서브 챔피언</label>
          <DropDown
            label="서브 챔피언 선택 메뉴"
            options={championOptions}
            currentOptionKey={subChampion.toLowerCase()}
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
          <button onClick={() => setIsOpen(false)}>취소</button>
          <button onClick={submitHandler}>등록</button>
        </div>
      </div>
    </div>
  );
}
