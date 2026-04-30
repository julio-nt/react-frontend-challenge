import { createRouter, RouterProvider } from '@tanstack/react-router';
import { rootRoute } from './root';
import { privateRouteTree } from './private';
import { publicRoutes } from './public';

const routeTree = rootRoute.addChildren([...publicRoutes, privateRouteTree]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function Router() {
  return <RouterProvider router={router} />;
}
