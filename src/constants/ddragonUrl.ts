const version = '14.3.1';

const DDRAGON_URL = {
  profileIcon: (iconId: number) =>
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`,
  tierIcon: (tierName: string) =>
    `${process.env.REACT_APP_PUBLIC_URL}/images/tier/${tierName}.png`,
};

export default DDRAGON_URL;
