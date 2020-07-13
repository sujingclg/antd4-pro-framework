import { Reducer } from 'redux';
import { Effect } from 'dva';
import { IMenuDataItem, Route, BreadcrumbNameMapType } from '@/components/typings';
import getMenuData from '@/utils/getMenuData';

export interface IMenuModelState {
  menuData: IMenuDataItem[];
  routeData: Route[];
  breadcrumbNameMap: BreadcrumbNameMapType;
}

interface IMenuModel {
  namespace: 'menu';
  state: IMenuModelState;
  effects: {
    getMenuData: Effect;
  };
  reducers: {
    save: Reducer<IMenuModelState>;
    changeHideInMenu: Reducer<IMenuModelState>;
  };
}

const MenuModel: IMenuModel = {
  namespace: 'menu',

  state: {
    menuData: [],
    routeData: [],
    breadcrumbNameMap: {},
  },

  effects: {
    *getMenuData({ payload }, { put }) {
      const { routes, formatMessage, authority, path } = payload;
      const { menuData, breadcrumbNameMap } = getMenuData(routes, formatMessage, authority, path);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap, routeData: routes },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    changeHideInMenu(state, { payload }) {
      return {
        ...state!,
      };
    },
  },
};

export default MenuModel;
