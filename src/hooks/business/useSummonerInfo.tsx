import { useQuery } from 'react-query';
import usePathSummonerData from 'hooks/usePathSummonerData';
import getSummonerInfo from 'service/getSummonerInfo';
import { SummonerInfo } from 'types/summoner';

type Props = {
  errorHandler: (err: string) => void;
};
export default function useSummonerInfo({ errorHandler }: Props) {
  const { country, name, tag } = usePathSummonerData();
  const { data, isLoading: isSummonerInfoLoading } = useQuery<SummonerInfo>(
    ['summoner', 'info', { country, name, tag }],
    () => getSummonerInfo(name, tag, country),
    {
      onError: (err) => {
        if (typeof err === 'string') errorHandler(err);
      },
    },
  );
  return { summonerInfo: data, isSummonerInfoLoading };
}
