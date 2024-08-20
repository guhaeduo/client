import classNames from 'classnames/bind';
import parse from 'html-react-parser';
import convertTagsToSpan from 'utils/convertTagsToSpan';
import { Tooltip } from 'react-tooltip';
import { ReactNode } from 'react';
import styles from './customTooltip.module.scss';

const cn = classNames.bind(styles);

type Props = {
  title?: string;
  body: string;
  children: ReactNode;
  name: string;
};

/**
 * 요소와 컨텐츠를 입력 받아 툴팁을 렌더링 합니다.
 * @param {string} title - 툴팁 컨텐츠의 타이틀 입니다. (선택 사항)
 * @param {string} body - 툴팁 컨텐츠의 바디 입니다.
 * @param {ReactNode} children - 툴팁을 표시할 컨텐츠입니다.
 * @param {string} name - 툴팁 이름입니다.
 * @return 요소와 툴팁
 */

export default function CustomTooltip({ title, body, children, name }: Props) {
  // 툴팁의 이름에서 공백을 슬래시로 제거합니다.
  const tooltipName = name.replace(/[\s.]+/g, '-');

  return (
    <div>
      <Tooltip
        opacity={1}
        className="tooltip"
        anchorSelect={`.${tooltipName}`}
        place="top"
        style={{ zIndex: 10 }}
      >
        <div className={cn('tooptipContent')}>
          {title && <h6 className={cn('title')}>{title}</h6>}
          <p className={cn('body')}>{parse(convertTagsToSpan(body))}</p>
        </div>
      </Tooltip>
      <a className={tooltipName}>{children}</a>
    </div>
  );
}
