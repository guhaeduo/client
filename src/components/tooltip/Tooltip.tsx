import React, { ReactNode, useState } from 'react';
import styles from './tooltip.module.scss';
import classNames from 'classnames/bind';
import parse from 'html-react-parser';
import convertTagsToSpan from 'utils/convertTagsToSpan';

const cn = classNames.bind(styles);

type Props = {
  children: ReactNode;
  className?: string;
  title: string;
  body?: string;
  minWidth: number;
};

/**
 * 미리 스타일을 지정해둔 툴팁입니다.
 * @param {ReactNode} children - 툴팁을 표시할 마우스 오버 컨텐츠 입니다.
 * @param {string} className - 툴팁의 클래스입니다.
 * @param {string} title - 툴팁 내부 컨텐츠의 타이틀 입니다.
 * @param {string} body - 툴팁 내부 컨텐츠의 바디 입니다.
 * @param {number} minWidth - 툴팁의 최소 너비입니다.
 */

export default function Tooltip({
  title,
  body,
  minWidth,
  children,
  className,
}: Props) {
  // 컨텐츠에 마우스 오버 상태인지 관리하는 상태입니다.
  const [mouseOver, setMouseOver] = useState(false);

  // 마우스 오버시 상태를 변경하는 함수입니다.
  const handleMouseOver = () => setMouseOver(true);

  // 마우스 리브시 상태를 변경하는 함수입니다.
  const handleMouseLeave = () => setMouseOver(false);

  return (
    <div
      className={cn('tooltip', className)}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{ minWidth, display: mouseOver ? 'block' : 'none' }}
        className={cn('tooptipContent')}
      >
        <h6 className={cn('title')}>{title}</h6>
        {body && <p className={cn('body')}>{parse(convertTagsToSpan(body))}</p>}
      </div>
      {children}
    </div>
  );
}
