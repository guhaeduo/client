import React, { ReactNode, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import useHandleOutsideClick from 'hooks/useHandleOutsideClick';
import styles from './modal.module.scss';

const cn = classNames.bind(styles);

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * 요소를 받아 모달을 렌더링 합니다.
 * @param {ReactNode} children - 모달의 내부 컨텐츠로 표시할 값입니다.
 * @param {boolean} isOpen - 모달의 오픈 여부를 나타내는 값입니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - 모달의 오픈 여부를 제어하는 함수입니다.
 * @return 모달 요소 | null
 */

export default function Modal({ children, isOpen, setIsOpen }: Props) {
  // Modal의 Ref를 선언하고 저장합니다.
  const modalRef = useRef(null);

  // ref에 등록된 요소 외의 영역을 클릭하면 모달을 닫습니다.
  useHandleOutsideClick({ isOpen, setIsOpen, ref: modalRef });

  useEffect(() => {
    // 모달이 열림 상태면 스크롤을 제한합니다.
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  // 모달이 닫힘 상태면 null을 리턴합니다.
  if (!isOpen) return null;

  return (
    <div className={cn('modalBackground')}>
      <div ref={modalRef} className={cn('modal')}>
        {children}
      </div>
    </div>
  );
}
