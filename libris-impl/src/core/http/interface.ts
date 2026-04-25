export type ApiRoutes = PublicApiRoutes | PrivateApiRoutes;

type PublicApiRoutes = '/auth/login' | '/result' | '/result/solicitation/id' | '/solicitation';

type PrivateApiRoutes =
  | '/p/auth/me'
  | '/p/auth/logout'
  | '/p/user'
  | '/p/patient'
  | '/p/patient/verify'
  | '/p/professional'
  | '/p/solicitation'
  | '/p/solicitation/status'
  | '/p/solicitation/publish'
  | '/p/solicitation/catalog'
  | '/p/solicitation/pdf'
  | '/p/income'
  | '/p/result'
  | '/p/result-layout'
  | '/p/result-pdf'
  | '/p/catalog/exams'
  | '/p/exam'
  | '/p/exam/layout'
  | '/p/stock'
  | '/p/stock_item'
  | '/p/stock/checkout'
  | '/p/stock/open'
  | '/p/stock/verify';

export interface ApiErrorResponse {
  error?: string;
  detail?: string;
  errors?: string[];
  code?: string;
  issues?: string[];
  message?: string;
}
