let CURRENT_USER_AUTHORITY: string | string[] = 'NULL';
type CurrentUserAuthorityType = string | string[] | (() => typeof CURRENT_USER_AUTHORITY);

type renderAuthorizeType = <T>(Authorized: T) => ((currentUserAuthority: CurrentUserAuthorityType) => T);

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
