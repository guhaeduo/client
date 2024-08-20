import { toast, ToastOptions } from 'react-toastify';
import { ReactNode } from 'react';

const Toast = {
  /**
   * 정보를 나타내는 토스트 메시지를 보여줍니다.
   * @param {ReactNode} message - 표시할 메시지
   * @param {ToastOptions} options - 토스트 옵션 (선택 사항)
   */
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.info(message, {
      ...options,
    });
  },
  /**
   * 성공을 나타내는 토스트 메시지를 보여줍니다.
   * @param {ReactNode} message - 표시할 메시지
   * @param {ToastOptions} options - 토스트 옵션 (선택 사항)
   */
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, {
      ...options,
    });
  },
  /**
   * 오류를 나타내는 토스트 메시지를 보여줍니다.
   * @param {ReactNode} message - 표시할 메시지
   * @param {ToastOptions} options - 토스트 옵션 (선택 사항)
   */
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, {
      ...options,
    });
  },
};

export default Toast;
