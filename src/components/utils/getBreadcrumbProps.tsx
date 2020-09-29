import React from 'react';
import * as H from 'history';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
import { Link } from 'umi';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
import defaultSettings from '@/defaultSettings';
import { BreadcrumbNameMapType, IMenuDataItem } from '../typings';
import { urlToList } from './pathTools';

export interface CustomBreadcrumbProps {
  location?: H.Location | { pathname: string };
  breadcrumbNameMap?: BreadcrumbNameMapType;
}

const itemRender: AntdBreadcrumbProps['itemRender'] = (route, params, routes, paths) => {
  if (route.path === '/') {
    return <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }
  const isLast = routes.indexOf(route) === routes.length - 1;
  const linkable = route.children && route.children.length === 0;
  return isLast || !linkable ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    // <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
    <Link to={`/${paths[paths.length - 1]}`}>{route.breadcrumbName}</Link>
  );
};

function renderItemLocal(item: IMenuDataItem, formatMessage: Function): string {
  if (item.locale) {
    return defaultSettings.menu.locale
      ? formatMessage({ id: item.locale, defaultMessage: item.name })
      : item.name;
  }
  return item.name;
}

function getMenuDataItem(breadcrumbNameMap: BreadcrumbNameMapType, url: string): IMenuDataItem {
  if (!breadcrumbNameMap) {
    return { path: '', name: '' };
  }
  let menuDataItem = breadcrumbNameMap[url];
  if (!menuDataItem) {
    Object.keys(breadcrumbNameMap).forEach((item) => {
      if (pathToRegexp(item).test(url)) {
        menuDataItem = breadcrumbNameMap[item];
      }
    });
  }
  return menuDataItem;
}

function conversionFromLocation(
  routerLocation: CustomBreadcrumbProps['location'] = { pathname: '/' },
  breadcrumbNameMap: BreadcrumbNameMapType,
  formatMessage: Function,
): AntdBreadcrumbProps['routes'] {
  if (!routerLocation) {
    return [];
  }
  // 将当前页面的路径转换为层级目录的列表
  const pathSnippets = urlToList(routerLocation.pathname);
  const breadcrumbRoutes: AntdBreadcrumbProps['routes'] = pathSnippets
    .map((url) => {
      const currentMenuDataItem = getMenuDataItem(breadcrumbNameMap, url);

      if (!currentMenuDataItem || currentMenuDataItem.inherited) {
        return { path: '', breadcrumbName: '' };
      }
      const name = renderItemLocal(currentMenuDataItem, formatMessage);
      // const children = currentMenuDataItem.children?.map(item => ({ // 将面包屑导航变为可下拉的
      //   path: item.path,
      //   breadcrumbName: item.name,
      // }));
      const hasAuthority = Authorized.check(currentMenuDataItem.authority, true, false);
      const children = currentMenuDataItem.clickable && hasAuthority ? [] : undefined; // 设置面包屑元素为可点击的
      return name && !currentMenuDataItem.hideInBreadcrumb
        ? { path: url, breadcrumbName: name, children }
        : { path: '', breadcrumbName: '' };
    })
    .filter((item) => Boolean(item && item.path));
  return breadcrumbRoutes;
}

export default function getBreadcrumbProps(
  props: CustomBreadcrumbProps,
  extraRoutes: AntdBreadcrumbProps['routes'] = [],
  formatMessage: Function,
): AntdBreadcrumbProps {
  const { location, breadcrumbNameMap } = props;
  if (!location || !breadcrumbNameMap) {
    return {};
  }
  const routes = conversionFromLocation(location, breadcrumbNameMap, formatMessage) || [];
  if (routes && routes.length > 0) {
    routes.unshift({
      path: '/',
      breadcrumbName: formatMessage({ id: 'menu.Home', defaultMessage: 'Home' }),
    });
  }
  return { routes: [...routes, ...extraRoutes], itemRender };
}
