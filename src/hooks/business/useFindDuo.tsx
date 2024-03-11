import useSignularOptionSelector from 'hooks/useSignularOptionSelector';
import { useState } from 'react';

export default function useFindDuo() {
  const [tierOption, setTierOption] = useSignularOptionSelector({
    defaultOption: 'ALL',
  });
  const [queueOption, setQueueOption] = useSignularOptionSelector({
    defaultOption: 'ALL',
  });
  const [laneOption, setLaneOption] = useSignularOptionSelector({
    defaultOption: 'ALL',
  });
  const [isRiotVerified, setIsRiotVerified] = useState(false);
  const [isTierDropDownOpen, setIsTierDropDownOpen] = useState(false);
  const [isQueueDropDownOpen, setIsQueueDropDownOpen] = useState(false);
  const isTierDropDownOpenHandler = (isOpen: boolean) => {
    setIsTierDropDownOpen(isOpen);
  };
  const isQueueDropDownOpenHandler = (isOpen: boolean) => {
    setIsQueueDropDownOpen(isOpen);
  };
  const isRiotVerifiedHandler = () => {
    setIsRiotVerified((prevVerified) => !prevVerified);
  };
  //   const {
  //     data: duoPosts,
  //     isLoading: isduoPostsLoading,
  //     error: duoPostsError,
  //     isFetching: isduoPostsFetching,
  //   } = useQuery<>({
  //     queryKey: ['duo', tierOptions, queueOptions, laneOptions, isRiotVerified],
  //     queryFn: () => getSummonerGameSummary(puuid, summaryQueueType, region),
  //   });

  return {
    tierOption,
    setTierOption,
    queueOption,
    setQueueOption,
    laneOption,
    setLaneOption,
    isTierDropDownOpen,
    isTierDropDownOpenHandler,
    isQueueDropDownOpen,
    isQueueDropDownOpenHandler,
    isRiotVerified,
    isRiotVerifiedHandler,
  };
}
