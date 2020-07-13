import { ICurrentUser } from '@/components/typings';

/**
 * Effects
 */
export const FETCH_CURRENT_USER = 'user/fetchCurrentUser';
export interface IFetchCurrentUserAction {
  type: typeof FETCH_CURRENT_USER;
  payload: void;
}

/**
 * Reducers
 */
export const SAVE_CURRENT_USER = 'user/saveCurrentUser';
export interface ISaveCurrentUserAction {
  type: typeof SAVE_CURRENT_USER;
  payload: ICurrentUser;
}
