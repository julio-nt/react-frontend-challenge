import { toast as SonnerToast } from 'sonner';

export const toast = {
  success(message: string, options?: { description?: string }) {
    SonnerToast.success(message, {
      description: options?.description,
      position: 'top-right',
      style: { backgroundColor: '#4BB543', color: '#fff' },
      closeButton: true,
    });
  },

  error(message: string, options?: { description?: string }) {
    SonnerToast.error(message, {
      description: options?.description,
      position: 'top-right',
      style: { backgroundColor: '#FF4C4C', color: '#fff' },
      closeButton: true,
    });
  },

  warning(message: string, options?: { description?: string }) {
    SonnerToast.warning(message, {
      description: options?.description,
      position: 'top-right',
      style: { backgroundColor: '#FFCC00', color: '#fff' },
      closeButton: true,
    });
  },
};
