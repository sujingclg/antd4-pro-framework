import React, { memo } from 'react';
import classNames from 'classnames';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import styles from './index.less';

interface HeaderDropdownProps extends DropDownProps{}

const HeaderDropdown: React.FC<HeaderDropdownProps> = props => {
  const { overlayClassName, ...restProps } = props;
  return (
    <Dropdown
      {...restProps}
      placement="bottomRight"
      overlayClassName={classNames(styles.container, overlayClassName)}
    />
  )
};

export default HeaderDropdown;
