import React, { memo } from 'react';
import classNames from 'classnames';
import { Link } from 'umi';
import BaseMenu, { BaseMenuProps } from '../SiderMenu/BaseMenu';
import RightContent, { RightContentProps } from '../GlobalHeader/RightContent';
import styles from './index.less';

export interface TopNavHeaderProps extends BaseMenuProps, RightContentProps {
  logo?: string;
  title?: string;
}

const TopNavHeader: React.FC<TopNavHeaderProps> = (props) => {
  const { logo, title, theme = 'dark', ...restProps } = props;

  return (
    <div className={classNames(styles.head, { [styles.light]: theme === 'light' })}>
      <div className={styles.left}>
        {(logo || title) && (
          <div className={styles.logo}>
            <Link to="/">
              {logo && <img src={logo} alt="logo" />}
              {title && <h1>{title}</h1>}
            </Link>
          </div>
        )}
        <BaseMenu {...restProps} mode="horizontal" theme={theme} className={styles.headMenu} />
      </div>
      <RightContent {...restProps} theme={theme} />
    </div>
  );
};

export default memo(TopNavHeader);
