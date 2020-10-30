import React, { memo } from 'react';
import { Drawer } from 'antd';
import SiderMenu, { SiderMenuProps } from './SiderMenu';

const SiderMenuWrapper: React.FC<SiderMenuProps> = (props: SiderMenuProps) => {
  const { isMobile, collapsed, onCollapse, theme, siderWidth } = props;
  // 针对移动端, 将侧边菜单设置为抽屉模式, 注意在抽屉模式中侧边菜单应为展开状态, collapsed 为 false
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse && onCollapse(true)}
      width={siderWidth}
      closable={false}
      style={{ padding: 0, height: '100vh', opacity: 0.9 }}
    >
      <SiderMenu
        {...props}
        collapsed={isMobile ? false : collapsed}
        theme={isMobile ? 'dark' : theme}
      />
    </Drawer>
  ) : (
    <SiderMenu {...props} />
  );
};

export default memo(SiderMenuWrapper);
