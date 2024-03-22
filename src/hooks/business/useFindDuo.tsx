import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
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
      queryFn: ({ pageParam }) => {
        return getFindDuoPosts(
          laneOption,
          queueOption,
          tierOption,
          isRiotVerified,
          pageParam,
        );
      },
      initialPageParam: 1,
      getNextPageParam: (data) => {
        const { hasNextPage, nextPageNumber } = data;
        return hasNextPage ? nextPageNumber : null;
      },
    });

  const postData = data?.pages.flatMap((page) => page.content);

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
