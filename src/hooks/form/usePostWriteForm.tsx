import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { PostContent, PostWriteForm } from 'types/post';
import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { useForm } from 'react-hook-form';
import { CHAMPION } from 'constants/options';
import { useState } from 'react';
import instance from 'service/instance';
import isCustomAxiosError from 'service/customAxiosError';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postData?: PostContent;
};

type FormValue = {
  summonerName: string;
  memo: string;
  password: string;
};

export default function usePostWriteForm({ setIsOpen, postData }: Props) {
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
    defaultOption: postData?.myMainLane || 'ALL',
  });
  const [subLane, setSubLane] = useSignularOptionSelector({
    defaultOption: postData?.mySubLane || 'ALL',
  });

  const [selectLane, setSelectLane] = useSignularOptionSelector({
    defaultOption: postData?.needPosition || 'ALL',
  });

  const [queueType, setQueueType] = useSignularOptionSelector({
    defaultOption: postData?.queueType || 'SOLO',
  });

  const [mainChampion, setMainChampion] = useSignularOptionSelector({
    defaultOption: postData?.myMainChampionName || championOptions[0].key,
  });
  const [subChampion, setSubChampion] = useSignularOptionSelector({
    defaultOption: postData?.mySubChampionName || championOptions[0].key,
  });
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
        `${postData.riotGameName}#${postData.riotGameTag}`,
      );
      setValue('memo', postData.memo);
    }
  }, []);

  const submitHandler = handleSubmit(async (data) => {
    const isNew = !postData;
    console.log(isNew, errors, data);
    try {
      if (isNew) {
        const newPostData: PostWriteForm = {
          region: 'kr',
          riotGameName: '',
          riotGameTag: '',
          needPosition: selectLane,
          queueType,
          myMainLane: mostLane,
          myMainChampionName: mainChampion,
          mySubLane: subLane,
          mySubChampionName: subChampion,
          isRiotVerified: false,
          isMicOn,
          memo: '',
        };

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

        if (!isLogin) {
          newPostData.password = data.password;
        }
        await instance.post('api/duo/post', newPostData);
        Toast.success(MESSAGE.DUO_POST_UPLOAD_SUCCESS);
      } else {
        console.log('수정입니당');
      }
      setIsOpen(false);
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
    isGuestPost: postData?.isGuestPost,
  };
}
