import { ChampionData } from './../types/DDragonData';
import { VERSION } from 'constants/url';
import axios from 'axios';

type LocalChampionData =
  | { championData: ChampionData; version: string }
  | undefined;

/**
 * DDragon에서 받아오는 정적 파일을 데이터 저장 유무, 버전비교를 통해 업데이트할지 결정하여 관리하는 함수입니다.
 */

export default async function updateDDragonData() {
  // 챔피언 데이터를 받아옵니다.
  const storedChampionDataString = localStorage.getItem('championData');
  const localChampionData: LocalChampionData | null =
    storedChampionDataString && JSON.parse(storedChampionDataString);

  if (!localChampionData || localChampionData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/champion.json`,
    );
    localStorage.setItem(
      'championData',
      JSON.stringify({ version: VERSION, championData: res.data.data }),
    );
  }
  // 아이템 데이터를 받아옵니다.
  const storedItemDataString = localStorage.getItem('itemData');
  const localItemData: LocalChampionData | null =
    storedItemDataString && JSON.parse(storedItemDataString);

  if (!localItemData || localItemData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/item.json`,
    );
    localStorage.setItem(
      'itemData',
      JSON.stringify({ version: VERSION, itemData: res.data.data }),
    );
  }
}
