/**
 * 返回接口的数据类型
 */
export interface IBaseResponse<T = any> {
  errno: number;
  errmsg: string;
  data: T;
}

type PermissionType = 'admin' | 'write' | 'read' | 'none';

/**
 * 后端返回的用户信息
 */
export interface IBackendUserItem {
  name: string;
  username: string;
  picture: string;
  email: string;
}
