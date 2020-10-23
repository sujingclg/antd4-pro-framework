import React from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';

export interface IMenuDataItem {
  key: string;
  title: string;
}

const getSubMenuOrItem: (item: IMenuDataItem) => React.ReactNode = (item) => {
  // if (Array.isArray(item.children)) {
  //   if (item.children.length === 0) {
  //     return null;
  //   }
  //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //   const childrenItems = getMenuItems(item.children);
  //   return (
  //     <Menu.SubMenu key={item.key} title={item.title}>
  //       {childrenItems}
  //     </Menu.SubMenu>
  //   );
  // }
  return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
};

const getMenuItems: (parentItem: IMenuDataItem[]) => React.ReactNode[] = (parentItem) =>
  parentItem
    // .filter((item) => item.content || item.children)
    .map((item) => getSubMenuOrItem(item))
    .filter((item) => item);

interface SideMenuProps {
  menuData: IMenuDataItem[];
  menuMode?: MenuProps['mode'];
  selectedMenuKey: string;
  setSelectedMenuKey: (key: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = (props) => {
  const { menuData, menuMode, selectedMenuKey, setSelectedMenuKey } = props;
  return (
    <Menu
      mode={menuMode}
      selectedKeys={[selectedMenuKey]}
      onClick={({ key }) => setSelectedMenuKey(key as string)}
    >
      {getMenuItems(menuData)}
    </Menu>
  );
};

export default SideMenu;
