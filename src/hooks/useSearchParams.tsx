import { useLocation } from 'react-router-dom';

/**
 * 파라미터에서 키값으로 값을 빼오는 함수를 반환합니다.
 * @return {(key: string) => string | null} getParams - param에서 데이터를 빼올 수 있는 함수
 */
export default function useSearchParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  /**
   * 키 값을 받아 파라미터의 값을 반환합니다.
   * @param {string} key - 파라미터 키 값
   */
  const getParams = (key: string) => searchParams.get(key);
  return getParams;
}
