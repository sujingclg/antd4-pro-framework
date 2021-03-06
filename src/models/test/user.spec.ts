import { effects } from 'redux-saga';
import { IFetchCurrentUserAction, ISaveCurrentUserAction } from '@/actionTypes/user';
import axiosInstance from '@/utils/axiosInstance';
import { queryCurrentUser } from '@/services/user';
import { IBackendUserItem, IBaseResponse } from '@/typings/interface';
import UserModel from '../user';

jest.mock('@/utils/axiosInstance');
const mockedAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('测试 Dva Effect fetchCurrentUser - 请求当前用户', () => {
  const saga = UserModel.effects.fetchCurrentUser;
  const action: IFetchCurrentUserAction = {
    type: 'user/fetchCurrentUser',
  };

  it('请求成功', async () => {
    const generator = saga(action, effects);
    // 第一次 yield 预激生成器
    generator.next();
    const resp: IBaseResponse<IBackendUserItem> = {
      errno: 0,
      errmsg: 'success',
      data: {
        name: '张三',
        username: 'zhangsan',
        picture: 'https://avatar.bytedance.com/zhangsan',
        email: 'zhangsan@bytedance.com',
      },
    };
    mockedAxiosInstance.get.mockResolvedValue({ data: resp });
    // 第二次 yield 发送请求并获取数据
    const { value, done } = generator.next((await queryCurrentUser()) as any);
    const putAction: ISaveCurrentUserAction = {
      type: 'saveCurrentUser',
      payload: {
        username: 'zhangsan',
        name: '张三',
        email: 'zhangsan@bytedance.com',
        avatar: 'https://avatar.bytedance.com/zhangsan',
      },
    };
    expect(value.PUT.action).toEqual(putAction);
    expect(done).toBe(false);
    // 第三次 return 生成器退出
    expect(generator.next()).toEqual({ value: undefined, done: true });
  });
});
