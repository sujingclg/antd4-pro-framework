import AuthorizeRenderer from '@/components/Authorized';
import defaultSettings from '@/defaultSettings';

export const authorityKey = `${defaultSettings.appName}-authority`;

type AuthorityType = 'guest' | 'user' | 'admin' | 'null';

export function getAuthority(str?: string): AuthorityType[] {
  // return ['user'];
  // /*
  const authorityString = typeof str === 'undefined' ? localStorage.getItem(authorityKey) : str;
  if (!authorityString) {
    return [];
  }
  let authority;
  try {
    authority = JSON.parse(authorityString); // 当 authorityString 为 JSON 字符串时, 解析后赋值给 authority
  } catch (e) {
    authority = authorityString; // 否则说明 authorityString 为字符串或字符串列表, 直接赋值给 authority
  }
  if (typeof authority === 'string') {
    return [authority] as AuthorityType[];
  }
  return authority;
  // */
}

export function setAuthority(authority?: AuthorityType | AuthorityType[]): void {
  const authorityArray = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem(authorityKey, JSON.stringify(authorityArray));
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  reloadAuthorized();
}

// eslint-disable-next-line import/no-mutable-exports
let Authorized = AuthorizeRenderer(getAuthority());

export const reloadAuthorized = () => {
  Authorized = AuthorizeRenderer(getAuthority());
};

export default Authorized;
