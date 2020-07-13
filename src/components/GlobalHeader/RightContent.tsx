import React, { memo } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined, BellOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd/lib/menu';
import { useIntl } from 'umi';
import HeaderSearch from '../HeaderSearch';
import AvatarDropdown, { AvatarDropdownProps } from './AvatarDropdown';
import SelectLang from '../SelectLang';
import { isUrl } from '../utils/utils';
import styles from './index.less';

export interface RightContentProps extends Partial<AvatarDropdownProps> {
  theme?: MenuProps['theme'];
  helpHref?: string;
}

const RightContent: React.FC<RightContentProps> = props => {
  const { theme, helpHref, currentUser, onLogout } = props;
  const intl = useIntl();
  return (
    <div className={classNames(styles.right, { [styles.dark]: theme === 'dark' })}>
      <HeaderSearch className={classNames(styles.action, styles.search)} />
      {helpHref && isUrl(helpHref) && (
        <Tooltip title={intl.formatMessage({ id: 'component.globalHeader.help' })}>
          <a target="_blank" rel="noopener noreferrer help" href={helpHref} className={styles.action}>
            <QuestionCircleOutlined />
          </a>
        </Tooltip>
      )}
      <span className={styles.action}>
        <BellOutlined />
      </span>
      <AvatarDropdown className={styles.action} currentUser={currentUser} onLogout={onLogout} />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default memo(RightContent);
