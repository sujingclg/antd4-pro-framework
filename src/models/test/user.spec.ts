// import { call, put } from 'dva';
import { effects } from 'redux-saga';
import { IFetchCurrentUserAction } from '@/actionTypes/user';
import UserModel from '../user';

describe('测试 dva model 文件 user', () => {
  it('测试请求当前用户', () => {
    const { call, put } = effects;
    const saga = UserModel.effects.fetchCurrentUser;
    const action: IFetchCurrentUserAction = {
      type: 'user/fetchCurrentUser',
    };
    const generator = saga(action, { call, put } as any);
    generator.next();
    generator.next();
    // expect(UserModel.effects.fetchCurrentUser(
    //   {},
    //   {},
    // ));
  });
});
