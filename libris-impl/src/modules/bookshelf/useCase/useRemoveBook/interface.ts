export interface RemoveBookRequest {
  bookId: string;
  status: 'to_read' | 'reading' | 'read';
}
