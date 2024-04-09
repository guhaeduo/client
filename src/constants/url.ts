// 애플리케이션에서 사용되는 URL 정보를 포함하는 객체입니다.
const URL = {
  /**
   * 프로필 아이콘 이미지 URL을 생성합니다.
   * @param iconId - 프로필 아이콘 ID
   */
  profileIcon: (iconId: number) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/profileicon/${iconId}.png`,

  /**
   * 티어 아이콘 이미지 URL을 생성합니다.
   * @param tierName - 티어 이름
   */
  tierIcon: (tierName: string) =>
    `${process.env.PUBLIC_URL}/images/tier/${tierName}.png`,

  /**
   * 챔피언 아이콘 이미지 URL을 생성합니다.
   * @param championId - 챔피언 ID
   */
  championIcon: (championId: string) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/${championId}.png`,

  /**
   * 아이템 아이콘 이미지 URL을 생성합니다.
   * @param itemNumber - 아이템 번호
   */
  itemIcon: (itemNumber: string) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/item/${itemNumber}.png`,

  /**
   * 라인 아이콘 이미지 URL을 생성합니다.
   * @param lane - 라인 이름
   */
  laneIcon: (lane: string) =>
    `${process.env.PUBLIC_URL}/images/lane/${lane}.png`,

  /**
   * 스펠 아이콘 이미지 URL을 생성합니다.
   * @param spellId - 스펠 ID
   */
  spellIcon: (spellId: string) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/spell/${spellId}.png`,

  /**
   * 룬 아이콘 이미지 URL을 생성합니다.
   * @param url - 퍼크 이미지 경로
   */
  perksIcon: (url: string) =>
    `https://ddragon.leagueoflegends.com/cdn/img/${url}`,
};

export default URL;
