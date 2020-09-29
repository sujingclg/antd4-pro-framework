import { BreadcrumbNameMapType, IMenuDataItem, Route } from '@/components/typings';
import Authorized from '@/utils/Authorized';
import defaultSettings from '@/defaultSettings';
import memoizeOne from 'memoize-one';
import { isEqual } from 'lodash-es';

const { check } = Authorized;

/**
 *
 * @param routeData       从 umi 传入 layout 组件的 route 属性中获取到的 routes 信息, 由 dva 路由系统生成
 * @param formatMessage   从组件中调用 useIntl 获取的 formatMessage 函数
 * @param parentAuthority 从 umi 传入组件的 route 属性中获取到的父级路由的权限参数
 * @param parentName      从 umi 传入组件的 route 属性中获取到的 path 信息
 */
interface FormatterProps {
  routeData: Route[];
  formatMessage: (data: { id: string; defaultMessage?: string }) => string;
  parentAuthority?: string[] | string;
  parentName?: string;
}

function formatter(props: FormatterProps): IMenuDataItem[] {
  const { routeData, formatMessage, parentAuthority, parentName } = props;
  if (!routeData) return [];
  return routeData
    .map((item) => {
      if (!item.name || !item.path) return null;
      let locale: string;
      if (parentName && parentName !== '/') {
        locale = `${parentName}.${item.name}`; // 递归调用时将进行串联, 从而形成一个以'/'分隔的路径
      } else {
        locale = `menu.${item.name}`; // 专门为Home页执行
      }
      const name = defaultSettings.menu.locale
        ? formatMessage({ id: locale, defaultMessage: item.name })
        : item.name;
      const result: Route = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority, // 对当前路由赋予在 umi/config 中配置的 authority, 如无则从其直接父节点继承
      };
      if (item.routes) {
        // 如果item有子路由, 则递归调用.
        const children = formatter({
          routeData: item.routes,
          formatMessage,
          parentAuthority: item.authority,
          parentName: locale,
        });
        result.children = children as IMenuDataItem[];
        delete result.routes; // 注意传入的是routeData, 返回menuData没有routes属性
      }
      return result as IMenuDataItem;
    })
    .filter((item) => item) as IMenuDataItem[]; // 过滤掉因没有 name 或 path 而返回 null 的 item
}
const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 *
 */
function getSubMenu(item: IMenuDataItem): IMenuDataItem {
  if (
    item.children && // item有children属性
    !item.hideChildrenInMenu && // item没有设置hideChildrenInMenu为true
    item.children.some((child) => child.name) // 子菜单列表中的各个菜单项中至少有一个菜单项有 name 属性
  ) {
    return {
      ...item,
      children: filterMenuData(item.children),
    };
  }
  return item; // 说明传入的 item 是一个菜单叶节点, 直接返回
}

function filterMenuData(menuData: IMenuDataItem[]): IMenuDataItem[] {
  if (!menuData) {
    return [];
  }
  return (
    menuData
      .filter((item) => item.name && !item.hideInMenu)
      // .map(item => getSubMenu(item))
      .map((item) => check(item.authority, getSubMenu(item), undefined) as IMenuDataItem)
      .filter((item) => item)
  );
}

/**
 * 获取面包屑映射
 * @param menuData MenuDataItem[] 菜单配置
 */
function getBreadcrumbNameMap(menuData: IMenuDataItem[]): BreadcrumbNameMapType {
  if (!menuData) {
    return {};
  }
  const routerMap: { [flatMenuKey: string]: IMenuDataItem } = {};

  const flattenMenuData = (data: IMenuDataItem[]) => {
    data.forEach((menuItem) => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      routerMap[menuItem.path] = menuItem;
    });
  };

  flattenMenuData(menuData);
  return routerMap;
}
const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

/**
 *
 * @param routes        从 umi 传入 layout 组件的 route 属性中获取到的 routes 信息, 由 dva 路由系统生成
 * @param formatMessage 从组件中调用 useIntl 获取的 formatMessage 函数
 * @param authority     从 umi 传入组件的 route 属性中获取到的权限参数
 * @param path 从 umi   传入组件的 route 属性中获取到的 path 信息
 */
export default (
  routes: Route[],
  formatMessage: (data: { id: string; defaultMessage?: string }) => string,
  authority?: string[] | string,
  path?: string,
) => {
  const originalMenuData = memoizeOneFormatter({
    routeData: routes,
    formatMessage,
    parentAuthority: authority,
    parentName: path,
  });
  const menuData = filterMenuData(originalMenuData);
  const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
  return {
    menuData,
    breadcrumbNameMap,
  };
};
