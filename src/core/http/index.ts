import { env } from '@shared/util/env';

function Http() {
  const booksApi = env.GOOGLE_BOOKS_API_KEY;

  async function get<T>(url: string, params: URLSearchParams = new URLSearchParams()): Promise<T> {
    try {
      params.append('key', booksApi);

      const urlToUse = `${url}?${params.toString()}`;

      const response = await fetch(urlToUse);

      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }

      return response.json();
    } catch (error: any) {
      const formattedError = error.response?.data;
      throw formattedError;
    }
  }

  return { get };
}

const HttpBookApi = Http();

export default HttpBookApi;
