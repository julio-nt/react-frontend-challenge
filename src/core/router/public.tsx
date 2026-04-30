import type { AnyRoute } from '@tanstack/react-router';

import { createRoute } from '@tanstack/react-router';
import LoginPage from '@modules/account/pages/Login';
import RegisterPage from '@modules/account/pages/Register';
import { rootRoute } from './root';
//
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: LoginPage.path,
  component: LoginPage.Component,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: RegisterPage.path,
  component: RegisterPage.Component,
});

export const publicRoutes: AnyRoute[] = [loginRoute, registerRoute];
