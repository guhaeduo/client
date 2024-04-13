import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { PostContent, PostWriteForm } from 'types/post';
import { useForm } from 'react-hook-form';
import { CHAMPION } from 'constants/options';
import instance from 'service/instance';
import isCustomAxiosError from 'service/isCustomAxiosError';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postData?: PostContent;
  setQueueOption: (queueOption: string) => void;
  onQueryClearHandler: () => void;
};

type FormValue = {
  summonerName: string;
  memo: string;
  password: string;
};

/**
 * 듀오 게시글 작성 & 수정 폼입니다.
 *
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - 게시글 작성 모달의 오픈 여부 핸들러
 * @param {} postData - 수정 게시글 데이터 (선택 사항)
 * @param {} setQueueOption - 듀오 게시판 게임 타입 필터 옵션 변경 함수
 * @param {} onQueryClearHandler - 게시글 삭제를 완료하고 나서 쿼리를 업데이트 하는 함수입니다.
 *
 * @return {boolean} isLogin - 작성자가 현재 로그인중인지 여부
 * @return {boolean} isRiotAccountOpen - 라이엇 계정 선택 드롭다운 오픈 여부
 * @return {React.Dispatch<React.SetStateAction<boolean>>} setIsRiotAccountOpen - 라이엇 계정 선택 드롭다운 오픈 여부 핸들러
 * @return {boolean} isQueueTypeOpen - 게임 타입 선택 드롭다운 오픈 여부
 * @return {React.Dispatch<React.SetStateAction<boolean>>} setIsQueueTypeOpen - 게임 타입 선택 드롭다운 오픈 여부 핸들러
 * @return {boolean} isMainChampionOpen - 메인 챔피언 선택 드롭다운 오픈 여부
 * @return {React.Dispatch<React.SetStateAction<boolean>>} setIsMainChampionOpen - 메인 챔피언 선택 드롭다운 오픈 여부 핸들러
 * @return {boolean} isSubChampionOpen - 서브 챔피언 선택 드롭다운 오픈 여부
 * @return {React.Dispatch<React.SetStateAction<boolean>>} setIsSubChampionOpen - 메인 챔피언 선택 드롭다운 오픈 여부 핸들러
 * @return {UseFormRegister<FormValue>} register - 입력 필드 등록 함수
 * @return {string} riotAccount - 현재 선택된 라이엇 계정입니다.
 * @return {React.Dispatch<React.SetStateAction<string>>} setRiotAccount - 현재 선택 라이엇 계정 변경 핸들러 입니다.
 * @return {string} mainLane - 소환사 메인 라인 옵션
 * @return {React.Dispatch<React.SetStateAction<string>>} setMainLane - 소환사 메인 라인 옵션 핸들러
 * @return {string} subLane - 소환사 서브 라인 옵션
 * @return {React.Dispatch<React.SetStateAction<string>>} setSubLane - 소환사 서브 라인 옵션 핸들러
 * @return {string} selectLane - 같이 플레이 할 소환사 라인 옵션
 * @return {React.Dispatch<React.SetStateAction<string>>} setSelectLane - 같이 플레이 할 소환사 라인 옵션 핸들러
 * @return {string} queueType - 듀오 게임 타입 옵션
 * @return {React.Dispatch<React.SetStateAction<string>>} setQueueType - 듀오 게임 타입 옵션 핸들러
 * @return {string} mainChampion - 소환사 메인 챔피언 옵션
 * @return {React.Dispatch<React.SetStateAction<string>>} setMainChampion - 소환사 메인 챔피언 옵션 핸들러
 * @return {string} subChampion - 소환사 서브 챔피언 옵션
 * @return {React.Dispatch<React.SetStateAction<string>>} setSubChampion - 소환사 서브 챔피언 옵션 핸들러
 * @return {boolean} isMicOn - 마이크 사용 여부
 * @return {React.Dispatch<React.SetStateAction<boolean>>} setIsMicOn - 마이크 사용 여부 핸들러
 * @return {{ key: string; display: string }[] | undefined} riotAccountOptions - 유저의 계정에 등록된 라이엇 계정 옵션 입니다.
 * @return {{ key: string; display: any; icon: any }[]} championOptions - 챔피언 옵션
 * @return {(e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>} submitHandler - 폼 제출 핸들러
 * @return {FieldErrors<FormValue>} errors - 폼 필드의 유효성 검사 오류
 * @return {boolean | undefined} isGuestPost - 로그인하지 않은 유저의 게시글인지 여부
 */

export default function usePostWriteForm({
  setIsOpen,
  postData,
  setQueueOption,
  onQueryClearHandler,
}: Props) {
  // 유저 정보를 받아와 저장합니다.
  const user = useSelector(selectUser);

  // 유저의 로그인 여부와 라이엇 계정 리스트를 받아옵니다.
  const { isLogin, riotAccountList } = user;

  // 라이엇 계정 선택 드롭다운 오픈 관리 상태입니다.
  const [isRiotAccountOpen, setIsRiotAccountOpen] = useState(false);
  // 게임 타입 선택 드롭다운 오픈 관리 상태입니다.
  const [isQueueTypeOpen, setIsQueueTypeOpen] = useState(false);
  // 메인 챔피언 선택 드롭다운 오픈 관리 상태입니다.
  const [isMainChampionOpen, setIsMainChampionOpen] = useState(false);
  // 서브 챔피언 선택 드롭다운 오픈 관리 상태입니다.
  const [isSubChampionOpen, setIsSubChampionOpen] = useState(false);

  // 라이엇 계정을 드롭다운 옵션에 넣기 위한 포맷으로 설정합니다.
  const riotAccountOptions = riotAccountList?.map((account) => ({
    key: `${account.name}#${account.tag}`,
    display: `${account.name}#${account.tag}`,
  }));

  // 챔피언 선택 드롭다운에서 사용하기 위한 옵션입니다.
  const championOptions = CHAMPION();

  // 라이엇 계정의 기본 옵션입니다.
  let riotAccountDefaultOption = '';

  // 게시글 데이터가 있다면 게시글에서 소환사 정보를 빼옵니다.
  // 게시글 데이터가 없고, 라이엇 계정 정보가 있다면 첫 번째 데이터를 기본 옵션으로 설정합니다.
  if (postData) {
    riotAccountDefaultOption = `${postData.riotGameName}#${postData.riotGameTag}`;
  } else if (riotAccountOptions?.length) {
    riotAccountDefaultOption = riotAccountOptions[0].key;
  }

  // 현재 선택된 라이엇 계정 옵션 상태입니다.
  const [riotAccount, setRiotAccount] = useState(riotAccountDefaultOption);
  // 소환사 메인 라인 옵션 상태입니다.
  const [mainLane, setMainLane] = useState(postData?.myMainLane || 'ALL');
  // 소환사 서브 라인 옵션 상태입니다.
  const [subLane, setSubLane] = useState(postData?.mySubLane || 'ALL');
  // 같이 플레이 할 소환사 라인 옵션 상태입니다.
  const [selectLane, setSelectLane] = useState(postData?.needPosition || 'ALL');
  // 듀오 게임 타입 옵션 상태입니다.
  const [queueType, setQueueType] = useState(postData?.queueType || 'SOLO');
  // 소환사 메인 챔피언 옵션 상태입니다.
  const [mainChampion, setMainChampion] = useState(
    postData?.myMainChampionName || championOptions[0].key,
  );
  // 소환사 서브 챔피언 옵션 상태입니다.
  const [subChampion, setSubChampion] = useState(
    postData?.mySubChampionName || championOptions[0].key,
  );
  // 마이크 사용 여부 상태입니다.
  const [isMicOn, setIsMicOn] = useState(postData?.isMicOn || false);

  // 듀오 게시글 작성을 위한 폼을 생성합니다.
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValue>();

  useEffect(() => {
    // 게시글 작성이 아닌 수정일 경우에는 소환사 이름과 메모를 게시글 데이터에서 뺴와서 설정합니다.
    if (postData) {
      setValue(
        'summonerName',
        `${postData.riotGameName}#${postData.riotGameTag}`,
      );
      setValue('memo', postData.memo);
    }
  }, []);

  // 게시글 작성 & 수정 요청 함수입니다.
  const submitHandler = handleSubmit(async (data) => {
    // 새로운 게시글 작성인지 여부입니다.
    const isNew = !postData;

    try {
      // 서버로 전송할 폼 데이터 입니다.
      const postDataToSubmit: PostWriteForm = {
        region: 'kr',
        riotGameName: '',
        riotGameTag: '',
        needPosition: selectLane,
        queueType,
        myMainLane: mainLane,
        myMainChampionName: mainChampion,
        mySubLane: subLane,
        mySubChampionName: subChampion,
        isRiotVerified: false,
        isMicOn,
        memo: data.memo,
        isGuestPost: !isLogin,
      };

      /**
       * 소환사 정보 업데이트 함수입니다.
       * @param {string} name - 소환사 이름
       * @param {string} tag - 소환사 태그
       */
      const setSummonerInfo = (name: string, tag: string) => {
        postDataToSubmit.riotGameName = name;
        postDataToSubmit.riotGameTag = tag;
      };

      // 라이엇 계정존재 유뮤에 따라 전송폼 데이터의 소환사 정보를 업데이트 합니다.
      if (riotAccountList?.length) {
        const [name, tag] = riotAccount.split('#');
        setSummonerInfo(name, tag);
        postDataToSubmit.isRiotVerified = true;
      } else {
        const [name, tag] = data.summonerName.split('#');
        setSummonerInfo(name, tag);
      }

      // 로그인중이 아니라면, 비밀번호를 전송폼에 포함합니다.
      if (!isLogin) {
        postDataToSubmit.password = data.password;
      }

      if (isNew) {
        // 새로운 게시글일 경우 서버로 데이터와 함께 요청을 보냅니다.
        await instance.post('api/duo/post', postDataToSubmit);
        // 게시글 작성 성공시 게시글 작성 성공 토스트를 띄워줍니다.
        Toast.success(MESSAGE.duoPostUploadSuccess);
      } else {
        // 게시글 수정일 경우 게스트 게시물인지를 전송폼에 업데이트 합니다.
        postDataToSubmit.isGuestPost = postData.isGuestPost;

        //  게스트 게시글일 경우 패스워드를 전송폼에 포함합니다.
        if (postData.isGuestPost) {
          postDataToSubmit.passwordCheck = data.password;
        }
        // 게시글 수정 요청을 서버로 데이터와 함께 요청을 보냅니다.
        await instance.put(`api/duo/post/${postData.postId}`, postDataToSubmit);
        // 게시글 수정 성공시 게시글 수정 성공 토스트를 띄워줍니다.
        Toast.success(MESSAGE.duoPostModifySuccess);
      }
      // 게시글 작성 & 수정 모달을 닫습니다.
      setIsOpen(false);
      // 듀오 게시판 게임타입 필터를 사용자가 작성한 게시글 게임 타입으로 변경합니다.
      setQueueOption(queueType);
      // 저장된 쿼리 데이터를 삭제합니다.
      onQueryClearHandler();
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        Toast.error(err.response.data.message);
      } else {
        Toast.error(UNKNOWN_NET_ERROR_MESSAGE);
      }
    }
  });

  return {
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
    mainLane,
    setMainLane,
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
    isGuestPost: postData?.isGuestPost,
  };
}
