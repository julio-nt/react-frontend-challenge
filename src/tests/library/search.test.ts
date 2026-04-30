import { describe, it, expect } from 'vitest';
import { searchParamsToQuery } from '@modules/library/useCase/useSearchBook/helpers';
import { adapter } from '@modules/library/useCase/useSearchBook/adapter';
import type { BookApi } from '@modules/book/model/BookApi';

describe('searchParamsToQuery', () => {
  it('appends the q filter', () => {
    const params = new URLSearchParams();
    searchParamsToQuery(params, { q: 'clean code' });
    expect(params.get('q')).toBe('clean code');
  });

  it('falls back to best+sellers when q is empty', () => {
    const params = new URLSearchParams();
    searchParamsToQuery(params, { q: '' });
    expect(params.get('q')).toBe('best+sellers');
  });

  it('appends intitle modifier', () => {
    const params = new URLSearchParams();
    searchParamsToQuery(params, { q: 'react', intitle: 'hooks' });
    expect(params.get('q')).toBe('react+intitle:hooks');
  });

  it('appends inauthor modifier', () => {
    const params = new URLSearchParams();
    searchParamsToQuery(params, { q: '', inauthor: 'Martin' });
    expect(params.get('q')).toContain('+inauthor:Martin');
  });

  it('uses default maxResults of 20', () => {
    const params = new URLSearchParams();
    searchParamsToQuery(params, { q: 'test' });
    expect(params.get('maxResults')).toBe('20');
  });

  it('respects a custom maxResults', () => {
    const params = new URLSearchParams();
    searchParamsToQuery(params, { q: 'test', maxResults: 10 });
    expect(params.get('maxResults')).toBe('10');
  });

  it('defaults printType to all', () => {
    const params = new URLSearchParams();
    searchParamsToQuery(params, { q: 'test' });
    expect(params.get('printType')).toBe('all');
  });

  it('defaults orderBy to relevance', () => {
    const params = new URLSearchParams();
    searchParamsToQuery(params, { q: 'test' });
    expect(params.get('orderBy')).toBe('relevance');
  });
});

const makeBookApi = (overrides: Partial<BookApi['volumeInfo']> = {}): BookApi => ({
  kind: 'books#volume',
  id: 'abc123',
  etag: 'etag',
  selfLink: '',
  volumeInfo: {
    title: 'Clean Code',
    publisher: 'Prentice Hall',
    publishedDate: '2008-08-01',
    readingModes: { text: false, image: false },
    ...overrides,
  },
  saleInfo: { country: 'US' },
});

describe('adapter', () => {
  it('maps id and title correctly', () => {
    const book = adapter(makeBookApi());
    expect(book.id).toBe('abc123');
    expect(book.volumeInfo.title).toBe('Clean Code');
  });

  it('maps authors array', () => {
    const book = adapter(makeBookApi({ authors: ['Robert Martin'] }));
    expect(book.volumeInfo.authors).toEqual(['Robert Martin']);
  });

  it('normalizes publishedDate when publisher is present', () => {
    const book = adapter(makeBookApi({ publisher: 'O\'Reilly', publishedDate: '2020-01-15' }));
    expect(book.volumeInfo.publishedDate).toBeTruthy();
  });

  it('sets publishedDate to empty string when publisher is absent', () => {
    const book = adapter(makeBookApi({ publisher: undefined, publishedDate: '2020-01-15' }));
    expect(book.volumeInfo.publishedDate).toBe('');
  });

  it('maps saleInfo country', () => {
    const book = adapter(makeBookApi());
    expect(book.saleInfo.country).toBe('US');
  });
});
