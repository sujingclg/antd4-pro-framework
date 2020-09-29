import React, { useState, useEffect, RefObject, useRef } from 'react';
import { Menu } from 'antd';
import { findIndex, flatMap } from 'lodash-es';
import styles from './index.less';

export interface ILayoutDataItem {
  key: string;
  title: string;
  content?: React.ReactNode;
  children?: Omit<ILayoutDataItem, 'children'>[];
}

export interface ProfileLayoutProps {
  layoutData: ILayoutDataItem[];
  isOpenKeysMoreThanOne?: boolean;
  showTitle?: boolean;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = (props) => {
  const { layoutData, isOpenKeysMoreThanOne = true, showTitle } = props;
  const flatLayoutData = flatMap(layoutData, (item) => (item.children ? item.children : item));
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>(flatLayoutData[0].key);
  const [openKeys, setOpenKeys] = useState<string[]>([layoutData[0].key]);
  const [menuMode, setMenuMode] = useState<'inline' | 'horizontal'>('inline');
  const rootRef: RefObject<HTMLDivElement> = useRef(null);

  const handleOpenChange: (antOpenKeys: string[]) => void = (antOpenKeys) => {
    if (isOpenKeysMoreThanOne) {
      setOpenKeys(antOpenKeys);
    } else {
      const lastOpenKey = antOpenKeys[antOpenKeys.length - 1];
      setOpenKeys([lastOpenKey]);
    }
  };

  const resize = () => {
    if (!rootRef.current) {
      return;
    }
    requestAnimationFrame(() => {
      if (!rootRef.current) {
        return;
      }
      const { offsetWidth } = rootRef.current;
      if (window.innerWidth < 992 && offsetWidth > 600) {
        setMenuMode('horizontal');
        setOpenKeys([]);
      } else {
        setMenuMode('inline');
      }
    });
  };

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const getSubMenuOrItem: (item: ILayoutDataItem) => React.ReactNode = (item) => {
    if (Array.isArray(item.children)) {
      if (item.children.length === 0) {
        return null;
      }
      // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
      const childrenItems = getMenuItems(item.children);
      return (
        <Menu.SubMenu key={item.key} title={item.title}>
          {childrenItems}
        </Menu.SubMenu>
      );
    }
    return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
  };

  const getMenuItems: (parentItem: ILayoutDataItem[]) => React.ReactNode[] = (parentItem) =>
    parentItem
      .filter((item) => item.content || item.children)
      .map((item) => getSubMenuOrItem(item))
      .filter((item) => item);

  const renderMenu = () => (
    <Menu
      openKeys={openKeys}
      mode={menuMode}
      selectedKeys={[selectedMenuKey]}
      onClick={({ key }) => setSelectedMenuKey(key as string)}
      onOpenChange={handleOpenChange as any}
    >
      {getMenuItems(layoutData)}
    </Menu>
  );

  const renderContent = () => {
    const index = findIndex(flatLayoutData, { key: selectedMenuKey });
    return index !== -1 ? (
      <>
        {showTitle && <div className={styles.title}>{flatLayoutData[index].title}</div>}
        {flatLayoutData[index].content}
      </>
    ) : null;
  };

  if (layoutData.length === 0) {
    return null;
  }

  return (
    <div className={styles.main} ref={rootRef}>
      <div className={styles.leftMenu}>{renderMenu()}</div>
      <div className={styles.right}>{renderContent()}</div>
    </div>
  );
};

export default ProfileLayout;
