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

  const localSpellDataArray: SummonerSpellInfo[] =
    Object.values(localSpellData);

  return localSpellDataArray.find(
    (spellInfo) => spellInfo.key === String(spellNumber),
  ) as SummonerSpellInfo;
}

// export function getPerkData(spellNumber: number) {
//   const localPerkData = JSON.parse(
//     localStorage.getItem('perkData') as string,
//   ).perkData;

//   return localPerkData.find(
//     (spellInfo: { key: string }) => spellInfo.key === String(spellNumber),
//   );
// }
