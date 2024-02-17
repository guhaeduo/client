import { http } from 'msw';
import { HttpResponse } from 'msw';
import summonerRankInfoData from '../mocks/mock/summonerRankInfoData.json';

export const handlers = [
  http.get(`${process.env.REACT_APP_SERVER_URL}/api/summoner`, async () => {
    await sleep(3000);
    return HttpResponse.json(summonerRankInfoData);
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
