import useOptionSelector from 'hooks/useOptionSelector';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function useFindDuo() {
  const [tierOptions, setTierOptions] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });
  const [queueOptions, setQueueOptions] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });
  const [laneOptions, setLaneOptions] = useOptionSelector({
    type: 'singular',
    defaultOptions: ['ALL'],
  });
  const [isTierDropDownOpen, setIsTierDropDownOpen] = useState(false);
  const [isQueueDropDownOpen, setIsQueueDropDownOpen] = useState(false);

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
    tierOptions,
    setTierOptions,
    queueOptions,
    setQueueOptions,
    laneOptions,
    setLaneOptions,
    isTierDropDownOpen,
    setIsTierDropDownOpen,
    isQueueDropDownOpen,
    setIsQueueDropDownOpen,
  };
}
