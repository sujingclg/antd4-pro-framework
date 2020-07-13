import GlobalModel from '../global';

describe('测试 dva model 文件 global', () => {
  it('changeLayoutCollapsed -> 使 collapsed 变为 false', () => {
    // expect('12345').toBe('12345');
    expect(
      GlobalModel.reducers.changeLayoutCollapsed(
        { collapsed: true },
        { type: 'changeLayoutCollapsed', payload: false },
      ),
    ).toEqual({ collapsed: false });
  });
});
