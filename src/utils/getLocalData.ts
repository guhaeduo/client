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
