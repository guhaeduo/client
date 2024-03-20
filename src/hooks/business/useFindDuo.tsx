import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import getFindDuoPosts from 'service/getFindDuoPosts';
import { useQueryClient } from '@tanstack/react-query';

export default function useFindDuo() {
  const [tierOption, setTierOption] = useSignularOptionSelector({
    defaultOption: 'ALL',
  });
  const [queueOption, setQueueOption] = useSignularOptionSelector({
    defaultOption: 'SOLO',
  });
  const [laneOption, setLaneOption] = useSignularOptionSelector({
    defaultOption: 'ALL',
  });
  const [isRiotVerified, setIsRiotVerified] = useState(false);
  const [isTierDropDownOpen, setIsTierDropDownOpen] = useState(false);
  const [isQueueDropDownOpen, setIsQueueDropDownOpen] = useState(false);
  const [isLaneDropDownOpen, setIsLaneDropDownOpen] = useState(false);

  const queryClient = useQueryClient();

  const isRiotVerifiedHandler = () => {
    setIsRiotVerified((prevVerified) => !prevVerified);
  };

  const onQueryUpdateHandler = () => {
    queryClient.invalidateQueries({
      queryKey: [
        'duoPosts',
        laneOption,
        queueOption,
        tierOption,
        isRiotVerified,
      ],
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: [
        'duoPosts',
        laneOption,
        queueOption,
        tierOption,
        isRiotVerified,
      ],
      queryFn: ({ pageParam }) =>
        getFindDuoPosts(
          laneOption,
          queueOption,
          tierOption,
          isRiotVerified,
          pageParam,
        ),
      initialPageParam: 1,
      getNextPageParam: (data) => (data.last ? null : data.pageable.pageNumber),
    });

  // const postData = data?.pages.flatMap((page) => page.content);

  const postData = [
    {
      isLogin: false,
      postId: 23,
      riotGameName: 'gameName23gameName23gameName23',
      riotGameTag: 'KR23',
      needPosition: 'ALL',
      needQueueType: 'SOLO',
      mainLane: 'TOP',
      mainChampion: 'ahri',
      subLane: 'ADC',
      subChampion: 'aatrox',
      soloRankTier: 'GOLD',
      freeRankTier: 'GOLD',
      memo: '메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모',
      puuid: 'ABCTEST23',
      micOn: false,
      riotVerified: false,
      isGuestPost: true,
    },
  ];
  return {
    tierOption,
    setTierOption,
    queueOption,
    setQueueOption,
    laneOption,
    setLaneOption,
    isTierDropDownOpen,
    setIsTierDropDownOpen,
    isQueueDropDownOpen,
    setIsQueueDropDownOpen,
    isLaneDropDownOpen,
    setIsLaneDropDownOpen,
    isRiotVerified,
    isRiotVerifiedHandler,
    postData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    onQueryUpdateHandler,
  };
}
