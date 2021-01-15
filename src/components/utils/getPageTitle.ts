import memoizeOne from 'memoize-one';
import { isEqual } from 'lodash-es';
import pathToRegexp from 'path-to-regexp';
import { BreadcrumbNameMapType, IMenuDataItem } from '@/components/typings';
import defaultSettings from '@/defaultSettings';
import { urlToList } from '@/components/utils/pathTools';

const { menu, title } = defaultSettings;

function matchParamsPath(
  pathname: string,
  breadcrumbNameMap: BreadcrumbNameMapType,
): IMenuDataItem | undefined {
  const urlList = urlToList(pathname).reverse();
  const breadcrumbNameMapKeys = Object.keys(breadcrumbNameMap);
  let pathKey;
  // eslint-disable-next-line no-restricted-syntax
  for (const url of urlList) {
    pathKey = breadcrumbNameMapKeys.find(
      (key: string) => pathToRegexp(key).test(url), // 检测 url 与 key 是否一致, 可匹配动态路由
    );
    if (pathKey) {
      return breadcrumbNameMap[pathKey];
    }
  }
  return undefined;
}

function getPageTitle(
  pathname: string,
  breadcrumbNameMap: BreadcrumbNameMapType,
  formatMessage: (data: { id: string; defaultMessage?: string }) => string,
): string {
  const currentRouteData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currentRouteData) {
    return title;
  }
  const pageName = menu.locale
    ? formatMessage({
        id: currentRouteData.locale || currentRouteData.name,
        defaultMessage: currentRouteData.name,
      })
    : currentRouteData.name;
  return `${pageName} - ${title}`;
}

export default memoizeOne(getPageTitle, isEqual);
