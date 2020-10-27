import React from 'react';
import { Layout } from 'antd';
import { Link } from 'umi';
import classNames from 'classnames';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import { getDefaultCollapsedSubMenus, getFlatMenuKeys } from './utils';
import styles from './index.less';

const { Sider } = Layout;

export interface SiderMenuProps extends BaseMenuProps {
  openKeysMoreThanOne?: boolean;
  siderWidth?: number;
  logo?: string;
  title?: string;
  onCollapse?: (collapsed: boolean) => void;
  isMobile: boolean;
  globalSiderMenu?: boolean; // 是否是全局边菜单
}

interface SiderMenuState {
  openKeys: Array<string>;
  pathname?: string;
}

class SiderMenu extends React.PureComponent<SiderMenuProps, SiderMenuState> {
  static defaultProps = {
    openKeysMoreThanOne: false,
    siderWidth: 256,
    theme: 'dark',
    globalSiderMenu: true,
  };

  readonly state: Readonly<SiderMenuState>;

  constructor(props: SiderMenuProps) {
    super(props);
    const { location } = props;
    this.state = {
      openKeys: location
        ? getDefaultCollapsedSubMenus(location.pathname, getFlatMenuKeys(props.menuData))
        : [],
    };
  }

  static getDerivedStateFromProps(
    nextProps: SiderMenuProps,
    prevState: SiderMenuState,
  ): SiderMenuState | null {
    const { pathname: statePathname } = prevState;
    const { location = { pathname: '/' }, menuData, openKeysMoreThanOne } = nextProps;
    if (!openKeysMoreThanOne && location.pathname !== statePathname) {
      return {
        pathname: location.pathname,
        openKeys: getDefaultCollapsedSubMenus(location.pathname, getFlatMenuKeys(menuData)),
      };
    }
    return null;
  }

  isMainMenu: (key: string) => boolean = (key) => {
    const { menuData = [] } = this.props;
    return menuData.some((item) => {
      if (key) {
        return item.path === key;
      }
      return false;
    });
  };

  handleOpenChange: (openKeys: string[]) => void = (openKeys) => {
    if (this.props.openKeysMoreThanOne) {
      this.setState({
        openKeys: [...openKeys], // 正常模式
      });
    } else {
      const lastOpenKey = openKeys[openKeys.length - 1];
      const moreThanOne = openKeys.filter((openKey) => this.isMainMenu(openKey)).length > 1;
      this.setState({
        openKeys: moreThanOne ? [lastOpenKey] : [...openKeys], // 手风琴模式
      });
    }
  };

  render(): React.ReactNode {
    const {
      theme,
      siderWidth,
      logo,
      title,
      collapsed,
      onCollapse,
      isMobile,
      globalSiderMenu,
    } = this.props;

    // eslint-disable-next-line no-shadow,@typescript-eslint/no-shadow
    const handleCollapse = (collapsed: boolean) => {
      if (onCollapse && !isMobile) {
        onCollapse(collapsed);
      }
    };

    const props = { ...this.props, openKeys: this.state.openKeys };
    return (
      <Sider
        theme={theme}
        width={siderWidth}
        breakpoint="md" // 开启响应式侧边栏
        onCollapse={handleCollapse}
        collapsed={collapsed}
        className={classNames(styles.sider, { [styles.global]: globalSiderMenu })}
      >
        {logo || title ? (
          <div className={classNames(styles.logo, { [styles.light]: theme === 'light' })}>
            <Link to="/">
              {logo ? <img src={logo} alt="logo" /> : null}
              {title ? <h1>{title}</h1> : null}
            </Link>
          </div>
        ) : null}
        <BaseMenu {...props} onOpenChange={this.handleOpenChange} />
      </Sider>
    );
  }
}

export default SiderMenu;
