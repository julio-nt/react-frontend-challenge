import { toast } from 'react-toastify';

export function useToast() {
  const toastSuccess = (message: string) => {
    toast(message, { type: 'success' });
  };

  const toastError = (message: string) => {
    toast(message, { type: 'error' });
  };

  const toastWarning = (message: string) => {
    toast(message, { type: 'warning' });
  };

  return { toastSuccess, toastError, toastWarning };
}
