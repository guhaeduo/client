import React, { useEffect } from 'react';

type Props<T extends HTMLElement> = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ref: React.RefObject<T>;
};

/**
 * 문서가 클릭 되었을 때 창을 닫는 함수를 등록합니다.
 */
export default function useHandleOutsideClick<T extends HTMLElement>({
  isOpen,
  setIsOpen,
  ref,
}: Props<T>) {
  useEffect(() => {
    /**
     * 문서 이벤트에 등록할 함수입니다.
     */
    const handleOutsideClose = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        // 요소가 open 상태이고 ref가 등록되어 있으며, 클릭된 요소가 ref의 하위 요소가 아니라면 요소를 닫습니다.
        setIsOpen(false);
      }
    };
    // 이벤트를 등록합니다.
    document.addEventListener('click', handleOutsideClose);
    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpen, ref]);
}
