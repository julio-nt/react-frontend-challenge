import { createRoute } from '@tanstack/react-router';

import PrivateLayout from '@modules/_layout';
import Home from '@modules/home/pages';
import { rootRoute } from './root';

const privateLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'private',
  component: PrivateLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: Home.path,
  component: Home.Component,
});

export const privateRouteTree = privateLayoutRoute.addChildren([homeRoute]);
