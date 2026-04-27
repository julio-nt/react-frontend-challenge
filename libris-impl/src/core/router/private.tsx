import { createRoute } from '@tanstack/react-router';

import PrivateLayout from '@modules/_layout';
import Home from '@modules/library/pages/SearchList';
import { rootRoute } from './root';
import type { SearchBookFilter } from '@modules/library/useCase/useSearchBook/interface';
import BookShelfsPage from '@modules/bookshelf/pages/BookShelfs';
import type { BookshelfListFilters } from '@modules/bookshelf/useCase/useUrlFilter/interface';

const privateLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'private',
  component: PrivateLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  validateSearch: (search) => ({
    q: search.q,
    intitle: search.intitle as string | undefined,
    inauthor: search.inauthor as string | undefined,
    inpublisher: search.inpublisher as string | undefined,
    printType: search.printType as SearchBookFilter['printType'],
    orderBy: search.orderBy as SearchBookFilter['orderBy'],
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

export const privateRouteTree = privateLayoutRoute.addChildren([homeRoute, bookshelfRoute]);
