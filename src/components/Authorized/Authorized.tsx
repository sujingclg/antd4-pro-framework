import React, { Fragment } from 'react';
import { CURRENT_USER_AUTHORITY } from './renderAuthorize';
import checkPermissions, { check, RouteAuthorityType } from './checkPermissions';

interface AuthorizedProps {
  routeAuthority: RouteAuthorityType;
  noMatch: React.ReactNode;
}

const Authorized: React.FC<AuthorizedProps> = (props) => {
  const { routeAuthority, noMatch = null, children } = props;
  const childrenRenderer = typeof children === 'undefined' ? null : children;
  const dom = checkPermissions(routeAuthority, CURRENT_USER_AUTHORITY, childrenRenderer, noMatch);
  return <Fragment>{dom}</Fragment>;
};

type AuthorizedType = React.FC<AuthorizedProps> & {
  check: typeof check;
};

export default Authorized as AuthorizedType;
