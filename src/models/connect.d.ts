import { IMenuModelState } from './menu';
import { IUserModelState } from './user';

export { IUserModelState };

interface Loading {
  effects: { [key: string]: boolean | undefined };
  models: {
    login?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
  };
}

export interface IConnectState {
  menu: IMenuModelState;
  user: IUserModelState;
  loading: Loading;
}
