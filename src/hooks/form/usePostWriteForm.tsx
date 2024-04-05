import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/userSlice';
import { PostContent, PostWriteForm } from 'types/post';
import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
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
  onQueryUpdateHandler: () => void;
};

type FormValue = {
  summonerName: string;
  memo: string;
  password: string;
};

export default function usePostWriteForm({
  setIsOpen,
  postData,
  setQueueOption,
  onQueryUpdateHandler,
}: Props) {
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

  let defaultOption = '';
  if (postData) {
    defaultOption = `${postData.riotGameName}#${postData.riotGameTag}`;
  } else if (riotAccountOptions && riotAccountOptions.length) {
    defaultOption = riotAccountOptions[0].key;
  }

  const [riotAccount, setRiotAccount] = useSignularOptionSelector({
    defaultOption,
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
          memo: data.memo,
          isGuestPost: !user.isLogin,
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
        const modifyPostData: PostWriteForm = {
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
          memo: data.memo,
          isGuestPost: postData.isGuestPost,
        };

        const setSummonerInfo = (name: string, tag: string) => {
          modifyPostData.riotGameName = name;
          modifyPostData.riotGameTag = tag;
        };

        if (riotAccountList?.length) {
          const [name, tag] = riotAccount.split('#');
          setSummonerInfo(name, tag);
          modifyPostData.isRiotVerified = true;
        } else {
          const [name, tag] = data.summonerName.split('#');
          setSummonerInfo(name, tag);
        }

        if (postData.isGuestPost) {
          modifyPostData.passwordCheck = data.password;
        }

        await instance.put(
          `https://guhaeduo.site/api/duo/post/${postData.postId}`,
          modifyPostData,
        );
        Toast.success(MESSAGE.DUO_POST_MODIFY_SUCCESS);
      }
      setIsOpen(false);
      setQueueOption(queueType);
      onQueryUpdateHandler();
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        Toast.error(err.response.data.message);
        return;
      }
      Toast.error(UNKNOWN_NET_ERROR_MESSAGE);
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
