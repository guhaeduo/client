export const VERSION = '14.3.1';

const URL = {
  profileIcon: (iconId: number) =>
    `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/profileicon/${iconId}.png`,
  tierIcon: (tierName: string) =>
    `${process.env.REACT_APP_PUBLIC_URL}/images/tier/${tierName}.png`,
};

export default URL;
