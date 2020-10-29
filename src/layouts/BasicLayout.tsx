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
  collapsed: boolean;
  menuData: Array<IMenuDataItem>;
  breadcrumbNameMap: BreadcrumbNameMapType;
  currentUser: ICurrentUser;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    collapsed,
    menuData,
    breadcrumbNameMap,
    dispatch,

    route: { routes, path, authority },
    location,
    children,
  } = props;

  const intl = useIntl();

  const [isMobile, setIsMobile] = useState<boolean>(
    useMediaQuery({ maxWidth: 575 }, undefined, (match: boolean) => {
      setIsMobile(match);
    }),
  );

  useEffect(() => {
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, formatMessage: intl.formatMessage, path, authority },
    });
  }, [getLocale()]);

  useEffect(() => {
    dispatch({ type: FETCH_CURRENT_USER });
  }, []);

  const getContext: () => IRouteContext = () => ({
    location,
    breadcrumbNameMap,
  });

  // eslint-disable-next-line no-shadow,@typescript-eslint/no-shadow
  const handleMenuCollapse = (collapsed: boolean) => {
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  const isTopMenu = true;

  const layout = (
    <Layout>
      {!isTopMenu && (
        <SiderMenu
          {...props}
          isMobile={isMobile}
          openKeysMoreThanOne
          logo={logo}
          title={defaultSettings.title}
          theme="light"
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
          theme="light"
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
        <title>{getPageTitle(location!.pathname, breadcrumbNameMap, intl.formatMessage)}</title>
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
  global,
  menu: menuModel,
  user,
}: IConnectState): Pick<
  BasicLayoutProps,
  'collapsed' | 'menuData' | 'breadcrumbNameMap' | 'currentUser'
> => ({
  collapsed: global.collapsed,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(BasicLayout);
