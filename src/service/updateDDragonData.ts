import { VERSION } from 'constants/url';
import axios from 'axios';
import URL from 'constants/url';
/**
 * DDragon에서 받아오는 정적 파일을 데이터 저장 유무, 버전비교를 통해 업데이트할지 결정하여 관리하는 함수입니다.
 */

export default async function updateDDragonData() {
  // 챔피언 데이터를 받아옵니다.
  // 아이템 데이터를 받아옵니다.
  // 스펠 데이터를 받아옵니다.
  updateChampionData();
  updateItemData();
  updateSpellData();
  updatePerksData();
}

type ChampionData = {
  name: string;
  id: string;
};

type NewChampionData = {
  name: string;
  icon: string;
};

async function updateChampionData() {
  const storedChampionDataString = localStorage.getItem('championData');
  const localChampionData =
    storedChampionDataString && JSON.parse(storedChampionDataString);

  if (!localChampionData || localChampionData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/champion.json`,
    );
    const championData: { [key: string]: ChampionData } = res.data.data;
    const newChampionData: { [key: string]: NewChampionData } = {};
    for (const [key, value] of Object.entries(championData)) {
      newChampionData[key.toLowerCase()] = {
        icon: URL.championIcon(key),
        name: value.name,
      };
    }
    localStorage.setItem(
      'championData',
      JSON.stringify({ version: VERSION, championData: newChampionData }),
    );
  }
}

async function updateItemData() {
  const storedItemDataString = localStorage.getItem('itemData');
  const localItemData =
    storedItemDataString && JSON.parse(storedItemDataString);

  if (!localItemData || localItemData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/item.json`,
    );
    localStorage.setItem(
      'itemData',
      JSON.stringify({ version: VERSION, itemData: res.data.data }),
    );
  }
}

type Spell = {
  name: string;
  key: string;
  description: string;
  id: string;
};

type newSpell = {
  icon: string;
  name: string;
  description: string;
  id: string;
};

async function updateSpellData() {
  const storedSpellDataString = localStorage.getItem('spellData');
  const localSpellData =
    storedSpellDataString && JSON.parse(storedSpellDataString);

  if (!localSpellData || localSpellData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/summoner.json`,
    );
    const spellData: { [key: string]: Spell } = res.data.data;
    const newSpellData: { [key: string]: newSpell } = {};
    const spellKey = Object.keys(spellData);
    spellKey.forEach((key) => {
      const spell = spellData[key];
      newSpellData[spell.key] = {
        id: spell.key,
        icon: URL.spellIcon(key),
        name: spell.name,
        description: spell.description,
      };
    });
    localStorage.setItem(
      'spellData',
      JSON.stringify({ version: VERSION, spellData: newSpellData }),
    );
  }
}

type Rune = {
  id: number;
  icon: string;
  shortDesc: string;
  name: string;
};

type Perks = {
  icon: string;
  id: number;
  key: string;
  name: string;
  slots: {
    runes: Rune[];
  }[];
}[];

type NewPerks = {
  icon: string;
  name: string;
  shortDesc?: string;
};

async function updatePerksData() {
  // 룬 데이터를 받아옵니다.
  const storedPerksString = localStorage.getItem('perksData');
  const localPerksData = storedPerksString && JSON.parse(storedPerksString);
  if (!localPerksData || localPerksData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/runesReforged.json`,
    );
    const perksData: Perks = res.data;
    const newPerks: { [key: number]: NewPerks } = {};

    perksData.forEach((perksItem) => {
      newPerks[perksItem.id] = {
        name: perksItem.name,
        icon: URL.perksIcon(perksItem.icon),
      };
      perksItem.slots.forEach((slot) => {
        slot.runes.forEach((rune) => {
          const { name, icon, shortDesc } = rune;
          newPerks[rune.id] = {
            name,
            icon: URL.perksIcon(icon),
            shortDesc,
          };
        });
      });
    });

    localStorage.setItem(
      'perksData',
      JSON.stringify({ version: VERSION, perksData: newPerks }),
    );
  }
}
