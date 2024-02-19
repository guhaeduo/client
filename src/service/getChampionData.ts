import axios from 'axios';
import { VERSION } from 'constants/url';

export default function getChamptionData() {
  return axios
    .get(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/champion.json`,
    )
    .then((res) => res.data.data);
}
