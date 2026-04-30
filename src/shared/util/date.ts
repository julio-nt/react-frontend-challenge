export function normalizeDate(date: string | undefined): string {
  if (!date) return '';

  if (date.length === 4) {
    return `${date}-01-01`;
  }
  const parsedDate = new Date(date);

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(date: string | undefined): string {
  if (!date) return '';

  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00` : date;
  const parsedDate = new Date(normalized);

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}
