import useOptionSelector from 'hooks/useOptionSelector';
import { useState } from 'react';

export default function useFindDuo() {
  const [tierOption, setTierOption] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });
  const [queueOption, setQueueOption] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });
  const [laneOption, setLaneOption] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });

  const [isTierDropDownOpen, setIsTierDropDownOpen] = useState(false);
  const [isQueueDropDownOpen, setIsQueueDropDownOpen] = useState(false);
  const isTierDropDownOpenHandler = (isOpen: boolean) => {
    setIsTierDropDownOpen(isOpen);
  };
  const isQueueDropDownOpenHandler = (isOpen: boolean) => {
    setIsQueueDropDownOpen(isOpen);
  };

  //   const {
  //     data: duoPosts,
  //     isLoading: isduoPostsLoading,
  //     error: duoPostsError,
  //     isFetching: isduoPostsFetching,
  //   } = useQuery<>({
  //     queryKey: ['duo', tierOptions, queueOptions, laneOptions],
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
  };
}
