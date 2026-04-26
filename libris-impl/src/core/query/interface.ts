import type { QueryKey } from '@tanstack/react-query';

const _queryKeys = ['MY_BOOK_LIST', 'LOGGED_USER', 'SEARCH_BOOK_LIST'] as const;

export const QueryKeys = Object.fromEntries(_queryKeys.map((k) => [k, k])) as {
  [K in (typeof _queryKeys)[number]]: K;
};

export type QueryKeysType = keyof typeof QueryKeys;

export type Keyish = QueryKey | QueryKeysType;

export type SetDataQuery<T> = {
  pageParams?: number[];
  pages: T[];
};
