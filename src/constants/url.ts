export const VERSION = '14.4.1';

const URL = {
  profileIcon: (iconId: number) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/profileicon/${iconId}.png`,
  tierIcon: (tierName: string) =>
    `${process.env.PUBLIC_URL}/images/tier/${tierName}.png`,
  championIcon: (championId: string) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/${championId}.png`,
  itemIcon: (itemNumber: string) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/item/${itemNumber}.png`,
  laneIcon: (lane: string) =>
    `${process.env.PUBLIC_URL}/images/lane/${lane}.png`,
  spellIcon: (spellId: string) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/spell/${spellId}.png`,
  perksIcon: (url: string) =>
    `https://ddragon.leagueoflegends.com/cdn/img/${url}`,
};

export default URL;
