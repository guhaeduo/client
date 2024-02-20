export const VERSION = '14.3.1';

const URL = {
  profileIcon: (iconId: number) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/profileicon/${iconId}.png`,
  tierIcon: (tierName: string) =>
    `${process.env.REACT_APP_PUBLIC_URL}/images/tier/${tierName}.png`,
  championIcon: (championId: string) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/${championId}.png`,
  laneIcon: (lane: string) =>
    `${process.env.REACT_APP_PUBLIC_URL}/images/lane/${lane}.png`,
};

export default URL;
