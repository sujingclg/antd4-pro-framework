import React from 'react';
import { RouteProps, RouteComponentProps } from 'react-router';

export interface IMenuDataItem {
  path: string; // 菜单项对应的前端路由路径
  name: string; // 显示在网页上的菜单名
  icon?: string; // 菜单项图标
  children?: IMenuDataItem[];
  target?: '_blank' | '_self' | '_parent' | '_top'; // 如果path是一个指向外部的连接, 则target为a标签的target属性, 以何种方式打开
  authority?: string[] | string; // 菜单项的权限, 与路由权限对应
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
  locale?: string; // 国际化的id号
  inherited?: boolean; // 面包屑中使用, 用途不详
  hideInBreadcrumb?: boolean; // 面包屑中使用, 将本级菜单项在面包屑路径中隐藏
  clickable?: boolean; // 在面包屑中是否可点击
  component?: React.ReactNode;
  // [key: string]: any;
}

export interface Route extends IMenuDataItem {
  routes: Route[];
}

type RouteType = Pick<RouteProps, 'component' | 'exact' | 'path'>;

export interface RouterTypes<T extends Object = {}, P = {}> extends RouteComponentProps<P> {
  route: RouteType & T;
}

export type WithFalse<T> = T | false;

export interface BreadcrumbNameMapType {
  [path: string]: IMenuDataItem;
}

export interface ICurrentUser {
  username?: string;
  avatar?: string;
  name?: string;
  email?: string;
  // title?: string;
  // group?: string;
  // signature?: string;
  // geographic?: any;
  // tags?: Array<{
  //   key: string;
  //   label: string;
  // }>;
  // unreadCount?: number;  // 未读消息数
}

export interface IParams {}
