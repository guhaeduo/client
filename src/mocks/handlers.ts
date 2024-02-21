import { http } from 'msw';
import { HttpResponse } from 'msw';
import summonerRankInfoData from '../mocks/mock/summonerRankInfoData.json';
import summonerRankSummary from '../mocks/mock/summonerRankSummary.json';
import summonerMatchListData from '../mocks/mock/summonerMatchListData.json';

export const handlers = [
  http.get(`${process.env.REACT_APP_SERVER_URL}/api/summoner`, async () => {
    await sleep(1000);
    return HttpResponse.json(summonerRankInfoData);
  }),
  http.get(
    `${process.env.REACT_APP_SERVER_URL}/api/matches/summary`,
    async () => {
      await sleep(1000);
      return HttpResponse.json(summonerRankSummary);
    },
  ),
  http.get(`${process.env.REACT_APP_SERVER_URL}/api/matches/list`, async () => {
    await sleep(1000);
    return HttpResponse.json(summonerMatchListData);
  }),
];

async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
