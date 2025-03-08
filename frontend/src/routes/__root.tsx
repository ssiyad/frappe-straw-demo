import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRoute({
  component: () => {
    return (
      <React.Fragment>
        <div>Hello "__root"!</div>
        <Outlet />
      </React.Fragment>
    );
  },
});
