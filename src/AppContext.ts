import React, { createContext } from 'react';

export interface IAppContext {}

const AppContext: React.Context<IAppContext> = createContext<IAppContext>({});

AppContext.displayName = 'AppContext';

export default AppContext;
