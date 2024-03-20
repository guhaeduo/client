import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { PostContent } from 'types/post';
import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { useForm } from 'react-hook-form';
import { CHAMPION } from 'constants/options';
import { useState } from 'react';
import instance from 'service/instance';
import isCustomAxiosError from 'service/customAxiosError';
import Toast from 'utils/toast';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postData?: PostContent;
};

type FormValue = {
  summonerName: string;
  memo: string;
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
      ? `${postData.riotGameName}#${postData.riotGameTag}`
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
    defaultOption: postData?.needPosition || 'ALL',
  });

  const [queueType, setQueueType] = useSignularOptionSelector({
    defaultOption: postData?.needQueueType || 'SOLO',
  });

  const [mainChampion, setMainChampion] = useSignularOptionSelector({
    defaultOption: postData?.mainChampion || championOptions[0].key,
  });
  const [subChampion, setSubChampion] = useSignularOptionSelector({
    defaultOption: postData?.subChampion || championOptions[0].key,
  });
  //   console.log(errors);
  const [isMicOn, setIsMicOn] = useState(postData?.micOn || false);

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
        `${postData.riotGameName}#${postData.riotGameTag}`,
      );
    }
  }, []);

  const submitHandler = handleSubmit(async (data) => {
    const isNew = !postData;
    try {
      if (isNew) {
        const newPostData = {
          region: 'kr',
          riotGameName: '',
          riotGameTag: '',
          isRiotVerified: false,
          needPosition: selectLane,
          queueType: queueType,
          myMainLane: mostLane,
          myMainChampionName: mainChampion,
          mySubLane: subLane,
          mySubChampionName: subChampion,
          isMicOn: isMicOn,
          memo: data.memo,
        };

        console.log(newPostData);

        const setSummonerInfo = (name: string, tag: string) => {
          newPostData.riotGameName = name;
          newPostData.riotGameTag = tag;
        };

        if (riotAccountList?.length) {
          const [name, tag] = riotAccount.split('#');
          setSummonerInfo(name, tag);
          newPostData.isRiotVerified = true;
        } else {
          const [name, tag] = data.summonerName.split('#');
          setSummonerInfo(name, tag);
        }

        await instance.post('api/duo/post', newPostData);
      } else {
      }
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        Toast.error(err.response.data.message);
      }
      console.log(err);
    }
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
