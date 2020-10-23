import React, { useEffect, useRef, useState } from 'react';
import { MenuProps } from 'antd/lib/menu';
import SideMenu, { IMenuDataItem } from './SideMenu';
import styles from './index.less';

interface ProfileLayoutProps {
  showTitle?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

const ProfileLayout: React.FC<ProfileLayoutProps> = (props) => {
  const { showTitle, children } = props;

  const [menuData, setMenuData] = useState<IMenuDataItem[]>([]);
  const [selectedMenuKey, setSelectedMenuKey] = useState<string>('');
  const [menuMode, setMenuMode] = useState<MenuProps['mode']>();
  const rootRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const newMenuData =
      React.Children.map(children, (child: any) => ({
        key: child.key,
        title: child.props.title,
      })) || [];
    setMenuData(newMenuData);
    setSelectedMenuKey(newMenuData[0]?.key || '');
  }, []);

  const renderContent = () => {
    return React.Children.map(children, (child: any) => {
      return child?.key === selectedMenuKey ? React.cloneElement(child, { showTitle }) : null;
    })?.filter((child) => child);
  };

  return (
    <div className={styles.main} ref={rootRef}>
      <div className={styles.leftMenu}>
        <SideMenu
          menuData={menuData}
          menuMode={menuMode}
          selectedMenuKey={selectedMenuKey}
          setSelectedMenuKey={setSelectedMenuKey}
        />
      </div>
      <div className={styles.right}>{renderContent()}</div>
    </div>
  );
};

export default ProfileLayout;
