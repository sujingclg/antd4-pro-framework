import axiosInstance from '@/utils/axiosInstance';
import { queryCurrentUser } from '../user';

jest.mock('@/utils/axiosInstance');

describe('测试 service 文件 user', () => {
  it('测试请求当前用户', async () => {
    // const users = {};
    const user = {
      errno: 0,
      errmsg: 'succ',
      data: {
        username: 'sujing.su',
        name: '苏靖',
        email: 'sujing.su@bytedance.com',
        picture: 'avatar',
      },
    };
    (axiosInstance.get as any).mockResolvedValue({ data: user });
    expect(await queryCurrentUser()).toEqual({
      username: 'sujing.su',
      name: '苏靖',
      email: 'sujing.su@bytedance.com',
      avatar: 'avatar',
    });
  });
});
