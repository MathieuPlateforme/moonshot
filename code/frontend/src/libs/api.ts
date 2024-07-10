import { get } from './utils';

const { VITE_REST_API } = import.meta.env;

export const getCatsFact = {
  query: ({ country }: { country: string }) =>
    get({
      url: `${VITE_REST_API}/fact`,
      options: {
        params: {
          country,
        },
      },
    }),
  format: ({data}: {data: any}) => data,
}