import { ICurrentUser } from '@/components/typings';

/**
 * Effects
 */
export const FETCH_CURRENT_USER = 'user/fetchCurrentUser';
export interface IFetchCurrentUserAction {
  type: typeof FETCH_CURRENT_USER;
}

/**
 * Reducers
 */
export interface ISaveCurrentUserAction {
  type: 'saveCurrentUser';
  payload: ICurrentUser;
}
