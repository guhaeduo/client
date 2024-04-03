import URL, { VERSION } from 'constants/url';
import axios from 'axios';

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

async function updateChampionData() {
  const storedChampionDataString = localStorage.getItem('championData');
  const localChampionData =
    storedChampionDataString && JSON.parse(storedChampionDataString);

  if (!localChampionData || localChampionData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/champion.json`,
    );
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

    localStorage.setItem(
      'itemData',
      JSON.stringify({ version: VERSION, itemData: newItemData }),
    );
  }
}

async function updateSpellData() {
  const storedSpellDataString = localStorage.getItem('spellData');
  const localSpellData =
    storedSpellDataString && JSON.parse(storedSpellDataString);

  if (!localSpellData || localSpellData.version !== VERSION) {
    const res = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/summoner.json`,
    );
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
    localStorage.setItem(
      'spellData',
      JSON.stringify({ version: VERSION, spellData: newSpellData }),
    );
  }
}

async function updatePerksData() {
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

export default async function updateDDragonData() {
  updateChampionData();
  updateItemData();
  updateSpellData();
  updatePerksData();
}
