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
      isGuestPost: false,
      postId: 1,
      createdAt: 1711008745000,
      summonerIconNumber: 0,
      riotGameName: '테스트',
      riotGameTag: 'kr',
      needPosition: 'ALL',
      queueType: 'SOLO',
      myMainLane: 'TOP',
      myMainChampionName: 'Teemo',
      mySubLane: 'MID',
      mySubChampionName: 'Ahri',
      soloRankTier: 'GOLD',
      soloRankLevel: 'IV',
      freeRankTier: 'SILVER',
      freeRankLevel: 'II',
      memo: '메모메모메모메모메모메모메모메모메모메모 메모메모메모메모메모 메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모',
      isMicOn: true,
      isRiotVerified: false,
      puuid: '테스트puuid',
    },
    {
      isGuestPost: true,
      postId: 2,
      createdAt: 1711008745000,
      summonerIconNumber: 0,
      riotGameName: '테스트',
      riotGameTag: 'kr',
      needPosition: 'ALL',
      queueType: 'SOLO',
      myMainLane: 'TOP',
      myMainChampionName: 'Teemo',
      mySubLane: 'MID',
      mySubChampionName: 'Ahri',
      soloRankTier: 'GOLD',
      soloRankLevel: 'IV',
      freeRankTier: 'SILVER',
      freeRankLevel: 'II',
      memo: '메모메모메모',
      isMicOn: true,
      isRiotVerified: true,
      puuid: '테스트puuid',
    },
    {
      isGuestPost: false,
      postId: 3,
      createdAt: 1711008745000,
      summonerIconNumber: 0,
      riotGameName: '테스트',
      riotGameTag: 'kr',
      needPosition: 'ALL',
      queueType: 'SOLO',
      myMainLane: 'TOP',
      myMainChampionName: 'Teemo',
      mySubLane: 'MID',
      mySubChampionName: 'Ahri',
      soloRankTier: 'GOLD',
      soloRankLevel: 'IV',
      freeRankTier: 'SILVER',
      freeRankLevel: 'II',
      memo: '메모메모메모메모메모메모메모메모메모메모 메모메모메모메모메모 메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모',
      isMicOn: false,
      isRiotVerified: false,
      puuid: '테스트puuid',
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
