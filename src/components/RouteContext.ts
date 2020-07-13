import React, { createContext } from 'react';
import { ISettings } from '@/defaultSettings';
import { BreadcrumbNameMapType } from './typings';

export interface IRouteContext {
  location?: { pathname: string };
  breadcrumbNameMap?: BreadcrumbNameMapType;
  CSSLayoutType?: ISettings['CSSLayoutType'];
}

const RouteContext: React.Context<IRouteContext> = createContext<IRouteContext>({});

export default RouteContext;
