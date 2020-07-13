import React, { memo } from 'react';
import { Menu, Avatar, Button } from 'antd';
import { UserOutlined, SettingOutlined, AuditOutlined, LogoutOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useIntl, history } from 'umi';
import { ClickParam } from 'antd/lib/menu';
import HeaderDropdown from '../HeaderDropdown';
import { ICurrentUser } from '@/components/typings';
import styles from './index.less';

export interface AvatarDropdownProps {
  currentUser?: ICurrentUser;
  className?: string;
  onLogout?: () => void;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = props => {
  const { currentUser, className, onLogout } = props;
  const intl = useIntl();
  const onMenuClick = (event: ClickParam) => {
    const { key } = event;
    if (key === 'logout') {
      onLogout && onLogout();
      return;
    }
    // history.push(`/account/${key}`);
  };

  const menu = (
    <Menu
      className={styles.menu}
      onClick={e => {
        console.log(e);
      }}
    >
      {/*<Menu.Item key="center">*/}
      {/*  <UserOutlined/> {intl.formatMessage({ id: 'menu.Account.Center', defaultMessage: 'Account Center' })}*/}
      {/*</Menu.Item>*/}
      {/*<Menu.Item key="settings">*/}
      {/*  <SettingOutlined/>Account Settings*/}
      {/*</Menu.Item>*/}
      <Menu.Item key="settings">
        <a href="https://ee.byted.org/kani/v2/#/apply/workflow/?appId=1117&resourceKey=novel_platform" target="_blank">
          <AuditOutlined />
          申请权限
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined /> {intl.formatMessage({ id: 'menu.Account.Logout', defaultMessage: 'Logout' })}
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
        <span className={styles.username}>{currentUser && currentUser.name ? currentUser.name : 'User'}</span>
      </span>
    </HeaderDropdown>
  );
};

export default memo(AvatarDropdown);
