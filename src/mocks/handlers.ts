import { http } from 'msw';
import { HttpResponse } from 'msw';
import summonerRankInfoData from '../mocks/mock/summonerRankInfoData.json';
import summonerRankSummary from '../mocks/mock/summonerRankSummary.json';

export const handlers = [
  http.get(`${process.env.REACT_APP_SERVER_URL}/api/summoner`, async () => {
    await sleep(3000);
    return HttpResponse.json(summonerRankInfoData);
  }),
  http.get(
    `${process.env.REACT_APP_SERVER_URL}/api/summoner/summary`,
    async () => {
      await sleep(3000);
      return HttpResponse.json(summonerRankSummary);
    },
  ),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
