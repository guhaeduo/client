import MESSAGE from 'constants/message';
import Toast from './toast';
/**
 * 클립보드에 전달받은 문자열을 복사하고 토스트를 띄워줍니다.
 * @param {string} text - 클립보드에 복사할 문자
 */

export default function clipBoardCopy(text: string) {
  // 클립보드에 전달받은 문자열을 복사합니다.
  navigator.clipboard.writeText(text);
  // 복사성공 토스트를 띄워줍니다.
  Toast.success(MESSAGE.clipBoardCopySuccess, { toastId: text });
}
