import { toast, ToastOptions } from 'react-toastify';
import { ReactNode } from 'react';

const Toast = {
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.info(message, {
      ...options,
    });
  },
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, {
      ...options,
    });
  },
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, {
      ...options,
    });
  },
};

export default Toast;
