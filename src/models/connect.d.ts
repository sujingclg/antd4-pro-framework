import { IGlobalModelState } from './global';
import { IMenuModelState } from './menu';
import { IUserModelState } from './user';

export { IGlobalModelState, IUserModelState };

interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    login?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
  };
}

export interface IConnectState {
  global: IGlobalModelState;
  menu: IMenuModelState;
  user: IUserModelState;
  loading: Loading;
}
