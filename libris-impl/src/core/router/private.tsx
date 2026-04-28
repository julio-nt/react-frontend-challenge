import { createRoute } from '@tanstack/react-router';

import PrivateLayout from '@modules/_layout';
import Home from '@modules/library/pages/SearchList';
import { rootRoute } from './root';
import type { SearchBookFilter } from '@modules/library/useCase/useSearchBook/interface';
import BookShelfsPage from '@modules/bookshelf/pages/BookShelfs';
import type { BookshelfListFilters } from '@modules/bookshelf/useCase/useUrlFilter/interface';
import BookDetailsPage from '@modules/library/pages/BookDetails';

const privateLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'private',
  component: PrivateLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  validateSearch: (search: SearchBookFilter) => ({
    q: search.q,
    intitle: search.intitle,
    inauthor: search.inauthor,
    inpublisher: search.inpublisher,
    printType: search.printType,
    orderBy: search.orderBy,
    maxResults: search.maxResults ? Number(search.maxResults) : undefined,
  }),
  path: Home.path,
  component: Home.Component,
});

const bookshelfRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: BookShelfsPage.path,
  component: BookShelfsPage.Component,
  validateSearch: (search): BookshelfListFilters => ({
    name: search.name as string | undefined,
    status: search.status as BookshelfListFilters['status'],
  }),
});

const bookDetailsRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: BookDetailsPage.path,
  component: BookDetailsPage.Component,
});

export const privateRouteTree = privateLayoutRoute.addChildren([
  homeRoute,
  bookshelfRoute,
  bookDetailsRoute,
]);
