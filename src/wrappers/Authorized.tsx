import React from 'react';
import { connect, Redirect, ConnectProps, IRoute } from 'umi';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/components/utils/Authorized';
import { IConnectState, IUserModelState } from '@/models/connect';

function getRouteAuthority(path: string, routeData: IRoute[]): string[] | string | undefined {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      authorities = route.authority || authorities;
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
}

interface AuthComponentProps extends ConnectProps {
  user: IUserModelState;
}

const AuthComponent: React.FC<AuthComponentProps> = (props) => {
  const { location, route = { routes: [] }, user, children } = props;

  const { currentUser } = user;
  const { routes = [] } = route;
  // const isLogin = getAuthority().length;
  // const isLogin = currentUser && currentUser.username;

  return (
    <Authorized
      routeAuthority={getRouteAuthority(location!.pathname, routes)}
      // noMatch={isLogin ? <Redirect to='/exception/403'/> : <Redirect to='/user/login'/>}
      noMatch={<Redirect to="/exception/403" />}
    >
      {children}
    </Authorized>
  );
};

const mapStateToProps = ({ user }: IConnectState): Pick<AuthComponentProps, 'user'> => ({
  user,
});

export default connect(mapStateToProps)(AuthComponent);
