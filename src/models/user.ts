import { Reducer } from 'redux';
import { ICurrentUser } from '@/components/typings';
import { queryCurrentUser, requestLogout } from '@/services/user';
import { Effect } from '@/actionTypes';
import { IFetchCurrentUserAction, ISaveCurrentUserAction } from '@/actionTypes/user';

export interface IUserModelState {
  currentUser: ICurrentUser;
}

interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    fetchCurrentUser: Effect<IFetchCurrentUserAction, any, ICurrentUser | void>;
    logout: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<IUserModelState, ISaveCurrentUserAction>;
  };
}

const UserModel: IUserModel = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrentUser(_, { call, put }) {
      const currentUser = yield call(queryCurrentUser);
      if (currentUser) {
        const action: ISaveCurrentUserAction = {
          type: 'saveCurrentUser',
          payload: currentUser,
        };
        yield put(action);
      }
    },

    *logout(_, { call }) {
      yield call(requestLogout);
    },
  },

  reducers: {
    saveCurrentUser(state, { payload }) {
      return { ...state!, currentUser: payload };
    },
  },
};

export default UserModel;
