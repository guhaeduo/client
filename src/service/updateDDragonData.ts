import URL, { VERSION } from 'constants/url';
import axios from 'axios';

// DDragon에서 받아오는 데이터들의 타입입니다.
type Champion = {
  name: string;
  id: string;
};

type NewChampion = {
  name: string;
  icon: string;
};

type Item = {
  name: string;
  description: string;
};

type NewItem = Item & {
  icon: string;
};

type Spell = {
  name: string;
  key: string;
  description: string;
  id: string;
};

type NewSpell = {
  icon: string;
  name: string;
  description: string;
};

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

/**
 * 챔피언 데이터를 업데이트하는 함수입니다.
 * 로컬 스토리지에서 챔피언 데이터를 가져와서 버전이 일치하지 않거나 없는 경우에만 업데이트합니다.
 */
async function updateChampionData() {
  // 로컬 스토리지에서 챔피언 데이터를 가져옵니다.
  const storedChampionDataString = localStorage.getItem('championData');
  const localChampionData =
    storedChampionDataString && JSON.parse(storedChampionDataString);

  // 로컬 챔피언 데이터가 없거나 버전이 일치하지 않는 경우에만 업데이트합니다.
  if (!localChampionData || localChampionData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/champion.json`,
    );
    // 새로운 챔피언 데이터를 형식에 맞게 가공합니다.
    const championData: { [key: string]: Champion } = res.data.data;
    const newChampionData: { [key: string]: NewChampion } = {};
    const championDataEntries = Object.entries(championData);
    for (let i = 0; i < championDataEntries.length; i += 1) {
      const [key, value] = championDataEntries[i];
      newChampionData[key.toLowerCase()] = {
        icon: URL.championIcon(key),
        name: value.name,
      };
    }

    // 로컬 스토리지에 새로운 챔피언 데이터를 저장합니다.
    localStorage.setItem(
      'championData',
      JSON.stringify({ version: VERSION, championData: newChampionData }),
    );
  }
}

/**
 * 아이템 데이터를 업데이트하는 함수입니다.
 * 로컬 스토리지에서 아이템 데이터를 가져와서 버전이 일치하지 않거나 없는 경우에만 업데이트합니다.
 */
async function updateItemData() {
  // 로컬 스토리지에서 아이템 데이터를 가져옵니다.
  const storedItemDataString = localStorage.getItem('itemData');
  const localItemData =
    storedItemDataString && JSON.parse(storedItemDataString);

  // 로컬 아이템 데이터가 없거나 버전이 일치하지 않는 경우에만 업데이트합니다.
  if (!localItemData || localItemData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/item.json`,
    );

    // 새로운 아이템 데이터를 형식에 맞게 가공합니다.
    const itemData: { [key: string]: Item } = res.data.data;
    const newItemData: { [key: string]: NewItem } = {};
    const itemDataEntries = Object.entries(itemData);
    for (let i = 0; i < itemDataEntries.length; i += 1) {
      const [key, value] = itemDataEntries[i];
      newItemData[key] = {
        name: value.name,
        description: value.description,
        icon: URL.itemIcon(key),
      };
    }

    // 로컬 스토리지에 새로운 아이템 데이터를 저장합니다.
    localStorage.setItem(
      'itemData',
      JSON.stringify({ version: VERSION, itemData: newItemData }),
    );
  }
}

/**
 * 소환사 주문 데이터를 업데이트하는 함수입니다.
 * 로컬 스토리지에서 소환사 주문 데이터를 가져와서 버전이 일치하지 않거나 없는 경우에만 업데이트합니다.
 */
async function updateSpellData() {
  // 로컬 스토리지에서 소환사 주문 데이터를 가져옵니다.
  const storedSpellDataString = localStorage.getItem('spellData');
  const localSpellData =
    storedSpellDataString && JSON.parse(storedSpellDataString);
  // 로컬 소환사 주문 데이터가 없거나 버전이 일치하지 않는 경우에만 업데이트합니다.
  if (!localSpellData || localSpellData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/summoner.json`,
    );
    // 새로운 소환사 주문 데이터를 형식에 맞게 가공합니다.
    const spellData: { [key: string]: Spell } = res.data.data;
    const newSpellData: { [key: string]: NewSpell } = {};
    const spellKey = Object.keys(spellData);
    spellKey.forEach((key) => {
      const spell = spellData[key];
      newSpellData[spell.key] = {
        icon: URL.spellIcon(key),
        name: spell.name,
        description: spell.description,
      };
    });

    // 로컬 스토리지에 새로운 소환사 주문 데이터를 저장합니다.
    localStorage.setItem(
      'spellData',
      JSON.stringify({ version: VERSION, spellData: newSpellData }),
    );
  }
}

/**
 * 룬 데이터를 업데이트하는 함수입니다.
 * 로컬 스토리지에서 룬 데이터를 가져와서 버전이 일치하지 않거나 없는 경우에만 업데이트합니다.
 */
async function updatePerksData() {
  // 로컬 스토리지에서 룬 데이터를 가져옵니다.
  const storedPerksString = localStorage.getItem('perksData');
  const localPerksData = storedPerksString && JSON.parse(storedPerksString);

  // 로컬 룬 데이터가 없거나 버전이 일치하지 않는 경우에만 업데이트합니다.
  if (!localPerksData || localPerksData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/runesReforged.json`,
    );

    // 새로운 소환사 주문 데이터를 형식에 맞게 가공합니다.
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

    // 로컬 스토리지에 새로운 룬 데이터를 저장합니다.
    localStorage.setItem(
      'perksData',
      JSON.stringify({ version: VERSION, perksData: newPerks }),
    );
  }
}

/** DDragon 데이터를 가져오거나, 업데이트 하는 함수 입니다. */
export default async function updateDDragonData() {
  updateChampionData();
  updateItemData();
  updateSpellData();
  updatePerksData();
}
