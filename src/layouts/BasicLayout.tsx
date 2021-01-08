import React, { Fragment, useEffect, useState } from 'react';
import { DispatchProp } from 'react-redux';
import { Layout } from 'antd';
import { useIntl, connect, getLocale, Helmet } from 'umi';
import { useMediaQuery } from 'react-responsive';
import SiderMenu from '@/components/SiderMenu';
import {
  BreadcrumbNameMapType,
  ICurrentUser,
  IMenuDataItem,
  Route,
  RouterTypes,
} from '@/components/typings';
import RouteContext, { IRouteContext } from '@/components/RouteContext';
import { IConnectState } from '@/models/connect';
import defaultSettings from '@/defaultSettings';
import { FETCH_CURRENT_USER } from '@/actionTypes/user';
import AppContext from '@/AppContext';
import getPageTitle from '@/utils/getPageTitle';
import logo from '@/assets/logo.png';
import Header from './Header';
import Footer from './Footer';
import styles from './BasicLayout.less';

const { Content } = Layout;

export interface BasicLayoutProps extends RouterTypes<Route>, DispatchProp {
  menuData: IMenuDataItem[];
  breadcrumbNameMap: BreadcrumbNameMapType;
  currentUser: ICurrentUser;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    route: { routes, path, authority },
    location: { pathname },

    menuData,
    breadcrumbNameMap,
    dispatch,

    children,
  } = props;

  const { formatMessage } = useIntl();

  const [collapsed, setCollapsed] = useState(true);
  const [isTopMenu, setIsTopMenu] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const [isMobile, setIsMobile] = useState<boolean>(
    useMediaQuery({ maxWidth: 575 }, undefined, (match: boolean) => {
      setIsMobile(match);
    }),
  );

  useEffect(() => {
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, formatMessage, path, authority },
    });
  }, [getLocale()]);

  useEffect(() => {
    dispatch({ type: FETCH_CURRENT_USER });
  }, []);

  const getContext: () => IRouteContext = () => ({
    location: { pathname },
    breadcrumbNameMap,
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleMenuCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const layout = (
    <Layout>
      {!isTopMenu && (
        <SiderMenu
          {...props}
          isMobile={isMobile}
          openKeysMoreThanOne
          logo={logo}
          title={defaultSettings.title}
          theme={theme}
          menuData={menuData}
          collapsed={collapsed}
          onCollapse={handleMenuCollapse}
          siderWidth={230}
        />
      )}
      <Layout className={styles.layout}>
        <Header
          {...props}
          collapsed={collapsed}
          isTopMenu={isTopMenu}
          isMobile={isMobile}
          theme={theme}
          logo={logo}
          title={defaultSettings.title}
          onCollapse={handleMenuCollapse}
          dispatch={dispatch}
        />
        <Content className={styles.content}>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getPageTitle(pathname, breadcrumbNameMap, formatMessage)}</title>
        <link
          rel="shortcut icon"
          href="//sf1-ttcdn-tos.pstatp.com/obj/ttfe/2020-01-06/lab-speech/static/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>
      <RouteContext.Provider
        value={{ ...getContext(), CSSLayoutType: isTopMenu ? 'Fixed' : 'Fluid' }}
      >
        <AppContext.Provider value={{}}>{layout}</AppContext.Provider>
      </RouteContext.Provider>
    </Fragment>
  );
};

const mapStateToProps = ({
  menu: menuModel,
  user,
}: IConnectState): Pick<BasicLayoutProps, 'menuData' | 'breadcrumbNameMap' | 'currentUser'> => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(BasicLayout);
