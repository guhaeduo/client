/**
 * 로컬에서 원하는 챔피언 데이터를 반환합니다.
 * @param {string} championName - 챔피언 이름
 */

export function getChampionData(championName: string) {
  // 로컬에서 챔피언 데이터를 가져옵니다.
  const localChampionData = JSON.parse(
    localStorage.getItem('championData') as string,
  ).championData;
  // 예외 케이스 - 아트록스
  if (championName === 'Atrox') return localChampionData.aatrox;

  // 전달받은 챔피언 이름과 일치하는 데이터를 반환합니다.
  return localChampionData[championName.toLowerCase()];
}

/**
 * 로컬에서 원하는 아이템의 데이터를 반환합니다.
 * @param {number} itemNumber - 아이템 번호
 */

export function getItemData(itemNumber: number) {
  // 로컬에서 아이템 데이터를 가져옵니다.
  const localItemData = JSON.parse(
    localStorage.getItem('itemData') as string,
  ).itemData;
  // 전달받은 아이템 번호와 일치하는 데이터를 반환합니다.
  return localItemData[itemNumber];
}

/**
 * 로컬에서 원하는 스펠의 데이터를 반환합니다.
 * @param {number} spellNumber - 스펠 번호
 */

export function getSpellData(spellNumber: number) {
  // 로컬에서 스펠 데이터를 가져옵니다.
  const localSpellData = JSON.parse(
    localStorage.getItem('spellData') as string,
  ).spellData;
  // 전달받은 스펠 번호와 일치하는 데이터를 반환합니다.
  return localSpellData[spellNumber];
}

/**
 * 로컬에서 원하는 룬의 데이터를 반환합니다.
 * @param {number} perksId - 룬 번호
 */

export function getPerksData(perksId: number) {
  // 로컬에서 룬 데이터를 가져옵니다.
  const localPerksData = JSON.parse(
    localStorage.getItem('perksData') as string,
  ).perksData;
  // 전달받은 룬 아이디와 일치하는 데이터를 반환합니다.
  return localPerksData[perksId];
}
