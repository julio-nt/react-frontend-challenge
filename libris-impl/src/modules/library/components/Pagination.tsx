import {
  Pagination as AppPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@shared/components/ui/pagination';

interface PaginationProps {
  pagination: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
  };
  onPageChange: (page: number) => void;
}

const SIBLINGS = 5;
const BOUNDARY = 1;

function buildPageRange(current: number, total: number): (number | 'ellipsis')[] {
  const range: (number | 'ellipsis')[] = [];

  const left = Math.max(1, current - SIBLINGS);
  const right = Math.min(total, current + SIBLINGS);

  // Left boundary
  for (let i = 1; i <= Math.min(BOUNDARY, total); i++) range.push(i);
  if (left > BOUNDARY + 1) range.push('ellipsis');

  // Window around current page
  for (let i = Math.max(left, BOUNDARY + 1); i <= Math.min(right, total - BOUNDARY); i++)
    range.push(i);

  // Right boundary
  if (right < total - BOUNDARY) range.push('ellipsis');
  for (let i = Math.max(total - BOUNDARY + 1, BOUNDARY + 1); i <= total; i++) range.push(i);

  // Deduplicate while preserving order
  return range.filter((item, idx, arr) => item === 'ellipsis' || arr.indexOf(item) === idx);
}

const BookPagination = ({ pagination, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
  const current = pagination.currentPage;

  const pages = buildPageRange(current, totalPages);

  function handlePage(page: number) {
    const startIndex = (page - 1) * pagination.itemsPerPage;
    onPageChange(startIndex);
  }

  return (
    <AppPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text='Anterior'
            onClick={(e) => {
              e.preventDefault();
              if (current > 1) handlePage(current - 1);
            }}
          />
        </PaginationItem>
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === current}
                onClick={(e) => {
                  e.preventDefault();
                  handlePage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            text='Próximo'
            onClick={(e) => {
              e.preventDefault();
              if (current < totalPages) handlePage(current + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </AppPagination>
  );
};

export default BookPagination;
