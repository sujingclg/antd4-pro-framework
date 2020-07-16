import React, { useMemo } from 'react';
import { Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { MenuMode, MenuProps } from 'antd/lib/menu';
import { Link } from 'umi';
import { urlToList } from '@/components/utils/pathTools';
import { isUrl } from '@/components/utils/utils';
import { IMenuDataItem, Route, RouterTypes } from '@/components/typings';
import { getFlatMenuKeys, getMatchedMenuData, getMenuMatches } from './utils';
import defaultSettings from '@/defaultSettings';
import menuIconMap from '@/menuIconMap';

const { SubMenu } = Menu;

const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

function getIcon(icon?: string | React.ReactNode): React.ReactNode {
  if (typeof icon === 'string') {
    if (isUrl(icon)) {
      return <img src={icon} alt="icon" style={{ width: '14px', marginRight: '10px' }} />;
    }
    if (icon.startsWith('icon-')) return <IconFont type={icon} />;
  }
  // return icon;
  return menuIconMap[icon as keyof typeof menuIconMap];
}

const conversionPath = (path: string): string => {
  if (path && path.indexOf('http') === 0) {
    return path;
  }
  return `/${path || ''}`.replace(/\/+/g, '/'); // 将path中全部的双斜杠 '//' 替换为单斜杠 '/'
};

const getMenuItemPath = (item: IMenuDataItem, forgetHistory: boolean, pathname: string): React.ReactNode => {
  const itemPath = conversionPath(item.path);
  const icon = getIcon(item.icon);
  const { target } = item;
  const { name } = item;
  if (/^https?:\/\//.test(itemPath)) {
    return (
      <a href={itemPath} target={target}>
        {icon}
        <span>{name}</span>
      </a>
    );
  }
  const replace: boolean = forgetHistory || itemPath === pathname;
  return (
    <Link to={itemPath} replace={replace}>
      {icon}
      <span>{name}</span>
    </Link>
  );
};

const getSubMenuOrItem = (item: IMenuDataItem, forgetHistory: boolean, pathname: string): React.ReactNode => {
  if (
    Array.isArray(item.children) &&
    !item.hideChildrenInMenu &&
    item.children.some(child => typeof child.name !== 'undefined')
  ) {
    const childrenItems = getNavMenuItems(item.children, forgetHistory, pathname);
    const { name } = item;
    return (
      <SubMenu
        title={
          item.icon ? (
            <span>
              {getIcon(item.icon)}
              <span>{name}</span>
            </span>
          ) : (
            name
          )
        }
        key={item.path}
      >
        {childrenItems}
      </SubMenu>
    );
  }
  return <Menu.Item key={item.path}>{getMenuItemPath(item, forgetHistory, pathname)}</Menu.Item>;
};

const getNavMenuItems = (menuData: IMenuDataItem[], forgetHistory: boolean, pathname: string): React.ReactNode[] =>
  menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => getSubMenuOrItem(item, forgetHistory, pathname))
    .filter(item => item); // 过滤出不是空对象的菜单节点.

const getSelectedMenuKeys = (pathname: string, menuData: IMenuDataItem[]): string[] => {
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop()) as string[];
};

export interface BaseMenuProps extends RouterTypes<Route> {
  mode?: MenuMode;
  theme?: MenuProps['theme'];
  collapsed?: boolean;
  onOpenChange?: (openKeys: string[]) => void;
  openKeys?: Array<string>;
  menuData: Array<IMenuDataItem>;
  forgetHistory?: boolean;
  className?: string;
}

const BaseMenu: React.FC<BaseMenuProps> = props => {
  const {
    match,
    location,
    mode = 'inline',
    theme,
    collapsed = false,
    onOpenChange,
    openKeys,
    menuData,
    forgetHistory = false,
    className,
  } = props;

  const matchedMenuData = useMemo(() => getMatchedMenuData(menuData, match), [menuData]);

  const selectedKeys = useMemo(() => {
    let selectedMenuKeys = getSelectedMenuKeys(location.pathname, menuData);
    if (!selectedMenuKeys.length && openKeys) {
      selectedMenuKeys = [openKeys[openKeys.length - 1]];
    }
    return selectedMenuKeys;
  }, [location, menuData, openKeys]);

  const menuProps = useMemo(() => {
    let props = {};
    if (openKeys && !collapsed && mode !== 'horizontal') {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }
    return props;
  }, [openKeys, collapsed, mode, selectedKeys]);

  const navMenuItems = useMemo(
    () => getNavMenuItems(matchedMenuData, forgetHistory, location.pathname),
    [matchedMenuData, location.pathname],
  );

  return (
    <Menu
      {...menuProps}
      theme={theme}
      mode={mode}
      onOpenChange={onOpenChange as any}
      selectedKeys={selectedKeys}
      className={className}
    >
      {navMenuItems}
    </Menu>
  );
};

export default BaseMenu;
