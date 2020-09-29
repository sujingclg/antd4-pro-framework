import React from 'react';
import { Layout } from 'antd';
import { DispatchProp } from 'react-redux';
import GlobalHeader, { GlobalHeaderProps } from '@/components/GlobalHeader';

const { Header } = Layout;

interface HeaderViewProps extends Partial<GlobalHeaderProps>, DispatchProp {
  isTopMenu: boolean;
  isMobile: boolean;
}

const HeaderView: React.FC<HeaderViewProps> = (props) => {
  const { isTopMenu, isMobile, onCollapse, dispatch, ...restProps } = props;

  const handleLogout = () => {
    dispatch({ type: 'user/logout' });
  };

  return (
    <Header style={{ padding: 0 }}>
      <GlobalHeader
        {...restProps}
        isMobile={isMobile}
        onCollapse={onCollapse}
        // helpHref="https://docor.bytedance.net/app/"
        onLogout={handleLogout}
      />
    </Header>
  );
};

export default HeaderView;
