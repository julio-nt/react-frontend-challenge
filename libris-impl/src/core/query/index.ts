import { QueryClient, type QueryKey } from '@tanstack/react-query';
import type { Keyish } from './interface';

const client = new QueryClient();

function toQueryKey(key: Keyish): QueryKey {
  return Array.isArray(key) ? key : [key];
}

function getData<T>(queryKey: Keyish): T | undefined {
  return client.getQueryData(toQueryKey(queryKey)) as T | undefined;
}

function setData<T>(
  queryKey: Keyish,
  updater: (current: T | undefined) => T | undefined
) {
  client.setQueryData<T>(toQueryKey(queryKey), updater);
}

const Query = {
  client,
  getData,
  setData,
} as const;

export default Query;
