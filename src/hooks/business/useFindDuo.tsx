import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import getFindDuoPosts from 'service/getFindDuoPosts';

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

  const onQueryRemoveHandler = () => {
    queryClient.removeQueries({
      queryKey: [
        'duoPosts',
        laneOption,
        queueOption,
        tierOption,
        isRiotVerified,
      ],
    });
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
    onQueryRemoveHandler();
  };

  useEffect(() => {
    onQueryUpdateHandler();
  }, [laneOption, queueOption, tierOption, isRiotVerified]);

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
      getNextPageParam: (pageData) =>
        pageData.hasNextPage ? pageData.nextPageNumber : null,
    });

  const postsData = data?.pages.flatMap((page) => page.content);

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
    postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    onQueryUpdateHandler,
  };
}
