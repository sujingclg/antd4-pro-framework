import React, { memo } from 'react';
import classNames from 'classnames';
import { Menu } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useIntl, getLocale, setLocale } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const changeLang = ({ key }: any) => {
  setLocale(key, false);
};

const locales: { key: string; label: string; icon: string }[] = [
  {
    key: 'zh-CN',
    label: '简体中文',
    icon: '🇨🇳',
  },
  // {
  //   key: 'en-US',
  //   label: 'English',
  //   icon: '🇺🇸',
  // },
];

interface SelectLangProps {
  className?: string;
  style?: React.CSSProperties;
}

const SelectLang: React.FC<SelectLangProps> = (props) => {
  const { className } = props;
  const intl = useIntl();
  const selectedLang = getLocale();
  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {locales.map((locale) => (
        <Menu.Item key={locale.key}>
          <span role="img" aria-label={locale.label}>
            {locale.icon}
          </span>
          {` ${locale.label}`}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <HeaderDropdown overlay={langMenu}>
      <span className={classNames(styles.dormDown, className)}>
        <GlobalOutlined title={intl.formatMessage({ id: 'navBar.lang' })} />
      </span>
    </HeaderDropdown>
  );
};

export default memo(SelectLang);
