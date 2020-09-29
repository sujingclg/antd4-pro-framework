import { Reducer } from 'redux';

export interface IGlobalModelState {
  collapsed: boolean;
}

interface IGlobalModel {
  namespace: 'global';
  state: IGlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<IGlobalModelState>;
  };
}

const GlobalModel: IGlobalModel = {
  namespace: 'global',

  state: {
    collapsed: true,
  },

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return { ...state, collapsed: payload };
    },
  },
};

export default GlobalModel;
