import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { PostData } from 'pages/findDuo/components/PostModal';
import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { useForm } from 'react-hook-form';
import { CHAMPION } from 'constants/options';
import { useState } from 'react';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postData?: PostData;
};

type FormValue = {
  summonerName: string;
  memo: string;
};

type NewPostData = {
  isMicOn: boolean;
  mostLane: string;
  subLane: string;
  selectLane: string;
  queueType: string;
  mainChampion: string;
  subChampion: string;
  memo: string;
  summonerName: string;
  summonerTag: string;
};

export default function useWritePostForm({ setIsOpen, postData }: Props) {
  const user = useSelector(selectUser);
  const { isLogin, riotAccountList } = user;

  const [isRiotAccountOpen, setIsRiotAccountOpen] = useState(false);
  const [isQueueTypeOpen, setIsQueueTypeOpen] = useState(false);
  const [isMainChampionOpen, setIsMainChampionOpen] = useState(false);
  const [isSubChampionOpen, setIsSubChampionOpen] = useState(false);

  const riotAccountOptions = riotAccountList?.map((account) => ({
    key: `${account.name}#${account.tag}`,
    display: `${account.name}#${account.tag}`,
  }));

  const championOptions = CHAMPION();

  const [riotAccount, setRiotAccount] = useSignularOptionSelector({
    defaultOption: postData
      ? `${postData.summonerName}#${postData.summonerTag}`
      : riotAccountOptions?.length
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
  //   console.log(errors);
  const [isMicOn, setIsMicOn] = useState(postData?.isMicOn || false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = useForm<FormValue>();

  useEffect(() => {
    if (postData) {
      setValue(
        'summonerName',
        `${postData.summonerName}#${postData.summonerTag}`,
      );
    }
  }, []);

  const submitHandler = handleSubmit((data) => {
    const newPostData: NewPostData = {
      isMicOn,
      mostLane,
      subLane,
      selectLane,
      queueType,
      mainChampion,
      subChampion,
      memo: data.memo,
      summonerName: '',
      summonerTag: '',
    };

    const setSummonerInfo = (name: string, tag: string) => {
      newPostData.summonerName = name;
      newPostData.summonerTag = tag;
    };

    if (riotAccountList?.length) {
      const [name, tag] = riotAccount.split('#');
      setSummonerInfo(name, tag);
    } else {
      const [name, tag] = data.summonerName.split('#');
      setSummonerInfo(name, tag);
    }

    console.log(newPostData);
  });

  return {
    isLogin,
    riotAccountList,
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
  };
}
