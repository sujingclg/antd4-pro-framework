import { Key } from 'react';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import * as user from './user';

/**
 * Dva Effect 执行后的返回值接口(如果有的话)
 */
export interface IDispatchReturn {
  succeeded?: boolean;
  errorMessage?: string;
  traceId?: Key;
}

export type Effect<A = AnyAction, TReturn = any, TNext = unknown> = (
  action: A,
  effects: EffectsCommandMap,
) => Generator<unknown, TReturn, TNext>;

const actionTypes = {
  user,
};

/**
 * DVA 限制导致在 model 文件内部使用 action 进行 put 操作时需要去除本名称空间内部的 action 的名称空间前缀
 * 即在 user 模块内调用 user/saveCurrentUser 时需要去除 user/ 前缀, 否则报错(报严重警告, 但程序能运行)
 */
const removeNamespace = (actionType: string): string => {
  if (actionType.indexOf('/') === -1) {
    return actionType;
  }
  return actionType.split('/')[1];
};

export { actionTypes as default, removeNamespace, user };
