import { ICurrentUser } from '@/components/typings';
import { IDispatchReturnExtra } from '@/actionTypes/index';

/**
 * Effects
 */
export const FETCH_CURRENT_USER = 'user/fetchCurrentUser';
export interface IFetchCurrentUserAction extends IDispatchReturnExtra {
  type: typeof FETCH_CURRENT_USER;
}

/**
 * Reducers
 */
export interface ISaveCurrentUserAction {
  type: 'saveCurrentUser';
  payload: ICurrentUser;
}
