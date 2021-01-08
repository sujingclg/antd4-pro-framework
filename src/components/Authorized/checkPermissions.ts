import React from 'react';
import { CURRENT_USER_AUTHORITY } from './renderAuthorize';

export type RouteAuthorityType =
  | undefined
  | string
  | string[]
  | Promise<any>
  | ((currentAuthority: string | string[]) => RouteAuthorityType);

/**
 *  * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 | Permission judgment } routeAuthority
 * @param { 你的权限 | Your permission description } currentUserAuthority
 * @param { 通过的组件 | Passing components } Target
 * @param { 未通过的组件 | no pass components } Exception
 */
export default function checkPermissions<T, E>(
  routeAuthority: RouteAuthorityType,
  currentUserAuthority: string | string[],
  Target: T,
  Exception: E,
): T | E | React.ReactNode {
  // console.log("routeAuthority", routeAuthority);
  // console.log("currentUserAuthority", currentUserAuthority);

  // 当传入的componentAuthority是undefined时执行以下语句
  if (!routeAuthority) {
    return Target;
  } // 对于没有设置权限的组件, 默认直接返回

  // 当传入的componentAuthority是权限数组时执行以下语句
  if (Array.isArray(routeAuthority)) {
    if (Array.isArray(currentUserAuthority)) {
      if (currentUserAuthority.some((item) => routeAuthority.includes(item))) {
        return Target; // 当authority和currentAuthority都是数组且某个元素同时出现在两者之中时, 返回targetComponent
      }
    } else if (routeAuthority.includes(currentUserAuthority)) {
      return Target;
    }
    return Exception;
  }

  // 当传入的componentAuthority是单个权限时执行以下语句
  if (typeof routeAuthority === 'string') {
    if (Array.isArray(currentUserAuthority)) {
      if (currentUserAuthority.some((item) => routeAuthority.includes(item))) {
        return Target; // 当authority和currentAuthority都是数组且某个元素同时出现在两者之中时, 返回targetComponent
      }
    } else if (routeAuthority === currentUserAuthority) {
      return Target;
    }
    return Exception;
  }

  if (routeAuthority instanceof Promise) {
    // TODO 当传入的componentAuthority是Promise对象时执行以下语句
  }

  if (typeof routeAuthority === 'function') {
    // TODO 当传入的componentAuthority是Function对象时执行
  }

  throw new Error('unsupported parameters');
}

export function check<T, K>(
  routeAuthority: RouteAuthorityType,
  Target: T,
  Exception: K,
): T | K | React.ReactNode {
  return checkPermissions(routeAuthority, CURRENT_USER_AUTHORITY, Target, Exception);
}
