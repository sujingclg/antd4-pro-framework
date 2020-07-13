import { Reducer } from 'redux';
import { ICurrentUser } from '@/components/typings';
import { queryCurrentUser, requestLogout } from '@/services/user';
import { Effect, removeNamespace, user as userActionTypes } from '@/actionTypes';

export interface IUserModelState {
  currentUser: ICurrentUser;
}

interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    fetchCurrentUser: Effect<userActionTypes.IFetchCurrentUserAction>;
    logout: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<IUserModelState, userActionTypes.ISaveCurrentUserAction>;
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
      yield put({
        type: removeNamespace(userActionTypes.SAVE_CURRENT_USER),
        payload: currentUser,
      });
    },

    *logout(_, { call }) {
      yield call(requestLogout);
    },
  },

  reducers: {
    saveCurrentUser(state, { payload }) {
      return { ...state!, currentUser: payload || {} };
    },
  },
};

export default UserModel;
