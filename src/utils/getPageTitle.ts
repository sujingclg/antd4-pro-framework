import memoizeOne from 'memoize-one';
import { isEqual } from 'lodash-es';
import pathToRegexp from 'path-to-regexp';
import { useIntl } from 'umi';
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
  for (const url of urlList) {
    pathKey = breadcrumbNameMapKeys.find(
      (key: string) => pathToRegexp(key).test(url), // 检测 url 与 key 是否一致, 可匹配动态路由
    );
    if (pathKey) { return breadcrumbNameMap[pathKey]; }
  }
  return undefined;
}

function getPageTitle(
  pathname: string,
  breadcrumbNameMap: BreadcrumbNameMapType,
): string {
  const intl = useIntl();
  const currentRouteData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currentRouteData) {
    return title;
  }
  const pageName = menu.locale ? intl.formatMessage({
    id: currentRouteData.locale || currentRouteData.name,
    defaultMessage: currentRouteData.name,
  }) : currentRouteData.name;
  return `${pageName} - ${title}`;
}

export default memoizeOne(getPageTitle, isEqual);
