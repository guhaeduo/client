import Toast from './toast';

export default function clipBoardCopy(text: string) {
  navigator.clipboard.writeText(text);
  Toast.success('클립보드에 복사되었습니다.', { toastId: text });
}
