import React from 'react';
import { DispatchProp } from 'react-redux';
import { Layout } from 'antd';
import classNames from 'classnames';
import GlobalHeader, { GlobalHeaderProps } from '@/components/GlobalHeader';
import TopNavHeader, { TopNavHeaderProps } from '@/components/TopNavHeader';
import styles from './BasicLayout.less';

const { Header } = Layout;

interface HeaderViewProps extends GlobalHeaderProps, TopNavHeaderProps, DispatchProp {
  isTopMenu: boolean;
  isMobile: boolean;
  theme?: 'light' | 'dark';
}

const HeaderView: React.FC<HeaderViewProps> = (props) => {
  const { isTopMenu, isMobile, theme, onCollapse, dispatch, ...restProps } = props;

  const handleLogout = () => {
    dispatch({ type: 'user/logout' });
  };

  return (
    <Header className={classNames(styles.header, { [styles.light]: theme === 'light' })}>
      {isTopMenu ? (
        <TopNavHeader {...restProps} theme={theme} />
      ) : (
        <GlobalHeader
          {...restProps}
          isMobile={isMobile}
          onCollapse={onCollapse}
          // helpHref="https://docor.bytedance.net/app/"
          onLogout={handleLogout}
        />
      )}
    </Header>
  );
};

export default HeaderView;
