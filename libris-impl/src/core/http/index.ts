import { env } from '@shared/util/env';

function Http() {
  const booksApi = env.GOOGLE_BOOKS_API_KEY;

  async function get<T>(url: string, params?: URLSearchParams) {
    try {
      const urlToUse = `${url}?${params || ''}key=${booksApi}`;

      const response = await fetch(urlToUse);

      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }

      return response.json as T;
    } catch (error: any) {
      const formattedError = error.response?.data;
      throw formattedError;
    }
  }

  // async function post<T, R>(url: string, data: T, credentials: boolean = true) {
  //   try {
  //     const response = await axios.post<T, AxiosResponse<R>>(`${apiUrl}${url}`, data, { withCredentials: credentials });
  //     return response;
  //   } catch (error: any) {
  //     const formattedError = error.response?.data;
  //     throw formattedError;
  //   }
  // }

  // async function patch<T, R>(url: string, data: T, credentials: boolean = true) {
  //   try {
  //     const response = await axios.patch<T, AxiosResponse<R>>(`${apiUrl}${url}`, data, { withCredentials: credentials });
  //     return response;
  //   } catch (error: any) {
  //     const formattedError = error.response?.data;
  //     throw formattedError;
  //   }
  // }

  // async function del<T>(url: string) {
  //   try {
  //     const response = await axios.delete<T>(`${apiUrl}${url}`, { withCredentials: true });
  //     return response;
  //   } catch (error: any) {
  //     const formattedError = error.response?.data;
  //     throw formattedError;
  //   }
  // }

  return { get };
}

const HttpBookApi = Http();

export default HttpBookApi;
