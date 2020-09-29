// eslint-disable-next-line import/no-mutable-exports
let CURRENT_USER_AUTHORITY: string | string[] = 'NULL';
type CurrentUserAuthorityType = string | string[] | (() => typeof CURRENT_USER_AUTHORITY);

// eslint-disable-next-line @typescript-eslint/naming-convention
type renderAuthorizeType = <T>(
  Authorized: T,
) => (currentUserAuthority: CurrentUserAuthorityType) => T;

// eslint-disable-next-line func-names
const renderAuthorize: renderAuthorizeType = function <T>(Authorized: T) {
  return (currentUserAuthority: CurrentUserAuthorityType) => {
    if (currentUserAuthority) {
      CURRENT_USER_AUTHORITY = currentUserAuthority as string[];
    }
    return Authorized;
  };
};

export { CURRENT_USER_AUTHORITY };
export default renderAuthorize;
