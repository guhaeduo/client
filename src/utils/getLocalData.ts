export function getChampionData(championName: string) {
  const localChampionData = JSON.parse(
    localStorage.getItem('championData') as string,
  ).championData;

  return localChampionData[championName];
}

export function getItemData(itemNumber: number) {
  const localItemData = JSON.parse(
    localStorage.getItem('itemData') as string,
  ).itemData;

  return localItemData[itemNumber];
}

export type SummonerSpellInfo = {
  id: string;
  key: string;
  name: string;
  description: string;
};

export function getSpellData(spellNumber: number) {
  const localSpellData = JSON.parse(
    localStorage.getItem('spellData') as string,
  ).spellData;

  return localSpellData[spellNumber];
}

export function getPerksData(perksId: number) {
  const localPerksData = JSON.parse(
    localStorage.getItem('perksData') as string,
  ).perksData;

  return localPerksData[perksId];
}
