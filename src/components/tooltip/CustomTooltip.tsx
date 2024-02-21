import styles from './customTooltip.module.scss';
import classNames from 'classnames/bind';
import parse from 'html-react-parser';
import convertTagsToSpan from 'utils/convertTagsToSpan';
import { Tooltip } from 'react-tooltip';
import { ReactNode } from 'react';

const cn = classNames.bind(styles);

type Props = {
  title: string;
  body?: string;
  children: ReactNode;
  tooltipName: string;
  tooltipSelect: string;
};

/**
 * 미리 스타일을 지정해둔 툴팁입니다.
 * @param {string} title - 툴팁 컨텐츠의 타이틀 입니다.
 * @param {string} body - 툴팁 컨텐츠의 바디 입니다.
 * @param {ReactNode} children - 툴팁을 표시할 컨텐츠입니다.
 * @param {string} tooltipName - 툴팁 이름입니다.
 * @param {string} tooltipSelect - 툴팁 검색이름입니다.
 */

export default function CustomTooltip({
  title,
  body,
  children,
  tooltipName,
  tooltipSelect,
}: Props) {
  return (
    <div>
      <Tooltip
        opacity={1}
        className="tooltip"
        anchorSelect={tooltipSelect}
        place="top"
      >
        <div className={cn('tooptipContent')}>
          <h6 className={cn('title')}>{title}</h6>
          {body && (
            <p className={cn('body')}>{parse(convertTagsToSpan(body))}</p>
          )}
        </div>
      </Tooltip>
      <a className={cn(tooltipName)}>{children}</a>
    </div>
  );
}
