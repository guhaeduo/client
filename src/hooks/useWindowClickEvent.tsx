import { useEffect } from 'react';

/**
 * 윈도우를 클릭하였을 때 실행시킬 함수를 간편하게 등록할 수 있는 훅입니다.
 * @param {() => C} callBack - 윈도우를 클릭하였을 때 실행시킬 함수입니다.
 * @param {D[]} deps - 의존성 배열입니다.
 */

export default function useWindowClickEvent<C, D>(
  callBack: () => C,
  deps: D[],
) {
  useEffect(() => {
    const handleClick = () => callBack();

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [callBack, ...deps]);
}
