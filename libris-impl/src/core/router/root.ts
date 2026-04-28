import { createRootRoute } from '@tanstack/react-router';
import NotFoundPage from '@modules/_layout/pages/NotFound';

export const rootRoute = createRootRoute({
  notFoundComponent: NotFoundPage.Component,
});
