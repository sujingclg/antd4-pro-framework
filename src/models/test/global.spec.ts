import GlobalModel from '../global';

describe('测试 Dva Reducer changeLayoutCollapsed - 展开/收起侧边菜单', () => {
  const initState = { collapsed: true, voices: [], emotions: [] };

  it('changeLayoutCollapsed -> 使 collapsed 变为 false', () => {
    const action = { type: 'changeLayoutCollapsed', payload: false };
    expect(GlobalModel.reducers.changeLayoutCollapsed(initState, action)).toEqual({
      ...initState,
      collapsed: false,
    });
  });
});
