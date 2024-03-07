/**
 * 로컬에서 원하는 챔피언 데이터를 가져옵니다.
 * @param {string} championName - 챔피언 이름입니다.
 */
export function getChampionData(championName: string) {
  const localChampionData = JSON.parse(
    localStorage.getItem('championData') as string,
  ).championData;
  return localChampionData[championName.toLowerCase()];
}

/**
 * 로컬에서 원하는 아이템의 데이터를 가져옵니다.
 * @param {number} itemNumber - 아이템 번호입니다.
 */
export function getItemData(itemNumber: number) {
  const localItemData = JSON.parse(
    localStorage.getItem('itemData') as string,
  ).itemData;
  return localItemData[itemNumber];
}

/**
 * 로컬에서 원하는 스펠의 데이터를 가져옵니다.
 * @param {number} spellNumber - 스펠 번호입니다.
 */

export function getSpellData(spellNumber: number) {
  const localSpellData = JSON.parse(
    localStorage.getItem('spellData') as string,
  ).spellData;
  return localSpellData[spellNumber];
}

/**
 * 로컬에서 원하는 룬의 데이터를 가져옵니다.
 * @param {number} perksId - 룬 번호입니다.
 */
export function getPerksData(perksId: number) {
  const localPerksData = JSON.parse(
    localStorage.getItem('perksData') as string,
  ).perksData;
  return localPerksData[perksId];
}
