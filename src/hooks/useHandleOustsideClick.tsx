import React, { useEffect } from 'react';

type Props<T extends HTMLElement> = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ref: React.RefObject<T>;
};

export default function useHandleOutsideClick<T extends HTMLElement>({
  isOpen,
  setIsOpen,
  ref,
}: Props<T>) {
  useEffect(() => {
    const handleOutsideClose = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        console.log('외부 클릭됨');
      }
    };
    document.addEventListener('click', handleOutsideClose);
    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpen, ref]);
}
