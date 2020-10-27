import React, { memo } from 'react';
import { Menu, Avatar } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import classNames from 'classnames';
import { useIntl, history } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import { ICurrentUser } from '../typings';
import styles from './index.less';

export interface AvatarDropdownProps {
  currentUser?: ICurrentUser;
  className?: string;
  onLogout?: () => void;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = (props) => {
  const { currentUser, className, onLogout } = props;
  const intl = useIntl();
  const onMenuClick = ({ key }: MenuInfo) => {
    if (key === 'logout') {
      onLogout && onLogout();
    }
    history.push(`/account/${key}`);
  };

  const menu = (
    <Menu className={styles.menu} onClick={onMenuClick}>
      <Menu.Item key="center">
        <UserOutlined />{' '}
        {intl.formatMessage({ id: 'menu.Account.Center', defaultMessage: 'Account Center' })}
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        {intl.formatMessage({ id: 'menu.Account.Settings', defaultMessage: 'Settings' })}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />{' '}
        {intl.formatMessage({ id: 'menu.Account.Logout', defaultMessage: 'Logout' })}
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menu}>
      <span className={classNames(className, styles.account)}>
        {currentUser && currentUser.avatar ? (
          <Avatar size="small" src={currentUser.avatar} className={styles.avatar} alt="avatar" />
        ) : (
          <Avatar size="small" icon={<UserOutlined />} className={styles.avatar} alt="avatar" />
        )}
        <span className={styles.username}>
          {currentUser && currentUser.name ? currentUser.name : 'User'}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default memo(AvatarDropdown);
