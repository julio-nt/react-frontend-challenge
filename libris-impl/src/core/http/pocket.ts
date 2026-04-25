import axios from 'axios';
import { env } from '../../shared/utils/env';

function Http() {
  const authData = window.localStorage.getItem('pocketbase_auth');

  const apiUrl = env.DATABASE_URL;
  const token = authData ? JSON.parse(authData).token : null;
  const headers = { Authorization: token || '' };

  function get(url: string) {
    const response = axios.get(`${apiUrl}${url}`, { headers });
    return response;
  }

  function post(url: string, data: any) {
    const response = axios.post(`${apiUrl}${url}`, data, { headers });
    return response;
  }

  function patch(url: string, data: any) {
    const response = axios.patch(`${apiUrl}${url}`, data, { headers });
    return response;
  }

  return { get, post, patch };
}

const PocketHttpClient = Http();

export default PocketHttpClient;
