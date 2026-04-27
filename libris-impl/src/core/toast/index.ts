import { toast as SonnerToast } from 'sonner';

export const toast = {
  success(message: string, options?: { description?: string }) {
    SonnerToast.success(message, {
      description: options?.description,
      position: 'top-right',
    });
  },

  error(message: string, options?: { description?: string }) {
    SonnerToast.error(message, {
      description: options?.description,
      position: 'top-right',
    });
  },
};
