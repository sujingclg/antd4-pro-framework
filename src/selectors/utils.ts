import { Key } from 'react';

export function getList<T>(byId: { [id in Key]: T }, allIds: Key[]): NonNullable<T>[] {
  return allIds.map((id) => byId[id]).filter((item) => item) as NonNullable<T>[];
}
