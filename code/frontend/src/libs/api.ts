import { get } from './utils';

// const { REST_API } = process.env;

export const getCatsFact = {
  query: ({ country }: { country: string }) =>
    get({
      // url: `${REST_API}/cat-fact`,
      url: `https://catfact.ninja/fact`,
      options: {
        params: {
          country,
        },
      },
    }),
  format: ({data}: {data: any}) => data,
}