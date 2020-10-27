import React, { memo } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import RightContent, { RightContentProps } from './RightContent';
import styles from './index.less';

export interface GlobalHeaderProps extends RightContentProps {
  collapsed?: boolean;
  isMobile?: boolean;
  logo?: string;
  onCollapse?: (collapsed: boolean) => void;
  extraContent?: React.ReactNode;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const { collapsed, isMobile, logo, extraContent, onCollapse, ...restProps } = props;
  const toggle = () => {
    if (onCollapse) {
      onCollapse(!collapsed);
    }
  };
  return (
    <div className={styles.header}>
      {isMobile && (
        <Link to="/" className={styles.logo} key="logo">
          <img src={logo} alt="logo" width="32" />
        </Link>
      )}
      <span className={styles.trigger} onClick={toggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
      {extraContent}
      <RightContent {...restProps} />
    </div>
  );
};

export default memo(GlobalHeader);
